import { supabase } from "@/lib/supabase";
import { getUserIdOrUnauthorized } from "@/utils/auth";
import camelcaseKeys from "camelcase-keys";
import { Request, Response } from "express";
import snakecaseKeys from "snakecase-keys";

export const getContracts = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    let query = supabase
      .from("Contracts")
      .select(
        `
        id,
        case_id,
        contract_number,
        contract_amount,
        note,
        created_at,
        user_id,
        case:Cases(id, name),
        installments:Installments (
            installment_order,
            percentage,
            amount,
            payment_date
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    const { data: contractsData, error } = await query;

    if (error) {
      console.error("Error fetching contracts:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch contracts",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: camelcaseKeys(contractsData, { deep: true }),
    });
  } catch (error: any) {
    console.error("Error fetching contracts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contracts",
      error: error.message,
    });
  }
};

export const getContract = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Contract ID is required",
      });
    }

    const { data: contract, error } = await supabase
      .from("Contracts")
      .select(
        `
        id,
        case_id,
        contract_number,
        contract_amount,
        note,
        created_at,
        user_id,
        case:Cases(id, name),
        installments:Installments(
            id,
            installment_order,
            percentage,
            amount,
            payment_date
        )
      `
      )
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          message: "Contract not found",
        });
      }

      console.error("Error fetching contract:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch contract",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: camelcaseKeys(contract, { deep: true }),
    });
  } catch (error: any) {
    console.error("Error in getContract:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

export const createContract = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    const snakeCaseData = snakecaseKeys(req.body, { deep: true });
    const { case_name, contract_number, contract_amount, note, installments } =
      snakeCaseData;

    // 驗證必要欄位
    if (!case_name || !contract_amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    
    // 根據案件名稱查找案件ID
    const { data: caseData, error: caseError } = await supabase
      .from("Cases")
      .select("id")
      .eq("name", case_name)
      .eq("user_id", userId);
      
    if (caseError || !caseData || caseData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Case not found with the provided name",
        error: caseError ? caseError.message : "No matching case found",
      });
    }
    
    const case_id = caseData[0].id;

    // 步驟 1: 創建合約
    const { data: contractData, error: contractError } = await supabase
      .from("Contracts")
      .insert([
        {
          case_id,
          contract_number,
          contract_amount,
          note,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (contractError) {
      console.error("Error creating contract:", contractError);
      return res.status(500).json({
        success: false,
        message: "Failed to create contract",
        error: contractError.message,
      });
    }

    // 步驟 2: 創建分期付款項目
    if (installments && installments.length > 0) {
      const installmentItems = installments.map((item: any) => {
        const { installment_order, percentage, amount, payment_date } = item;
        return {
          user_id: userId,
          contract_id: contractData.id,
          installment_order,
          percentage,
          amount,
          payment_date,
        };
      });

      const { error: itemsError } = await supabase
        .from("Installments")
        .insert(installmentItems);

      if (itemsError) {
        console.error("Error creating installment items:", itemsError);
        // 如果插入項目失敗，刪除剛才創建的合約
        await supabase.from("Contracts").delete().eq("id", contractData.id);

        return res.status(500).json({
          success: false,
          message: "Failed to create installment items",
          error: itemsError.message,
        });
      }
    }

    // 步驟 3: 獲取完整的合約信息（包括分期付款項目和案件信息）
    const { data: completeContract, error: fetchError } = await supabase
      .from("Contracts")
      .select(
        `
        id,
        case_id,
        contract_number,
        contract_amount,
        note,
        created_at,
        user_id,
        case:Cases(id, name),
        installments:Installments(
            id,
            installment_order,
            percentage,
            amount,
            payment_date
        )
      `
      )
      .eq("id", contractData.id)
      .single();

    if (fetchError) {
      console.error("Error fetching complete contract:", fetchError);
      return res.status(500).json({
        success: false,
        message: "Contract created but failed to fetch complete data",
        error: fetchError.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Contract created successfully",
      data: camelcaseKeys(completeContract, { deep: true }),
    });
  } catch (error: any) {
    console.error("Error in createContract:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Contract ID is required",
      });
    }

    // 檢查合約是否存在且屬於當前用戶
    const { data: existingContract, error: fetchError } = await supabase
      .from("Contracts")
      .select("id")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          message:
            "Contract not found or you don't have permission to update it",
        });
      }

      console.error("Error fetching contract:", fetchError);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch contract",
        error: fetchError.message,
      });
    }

    // 轉換請求數據為 snake_case
    const snakeCaseData = snakecaseKeys(req.body, { deep: true });
    const { case_id, contract_number, contract_amount, note, installments } =
      snakeCaseData;
      
    // 檢查案件是否存在且屬於當前用戶
    if (case_id) {
      const { data: caseData, error: caseError } = await supabase
        .from("Cases")
        .select("id")
        .eq("id", case_id)
        .eq("user_id", userId)
        .single();
        
      if (caseError) {
        return res.status(400).json({
          success: false,
          message: "Invalid case ID or case not found",
          error: caseError.message,
        });
      }
    }

    // 更新合約基本信息
    const { error: updateError } = await supabase
      .from("Contracts")
      .update({
        case_id,
        contract_number,
        contract_amount,
        note,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", userId);

    if (updateError) {
      console.error("Error updating contract:", updateError);
      return res.status(500).json({
        success: false,
        message: "Failed to update contract",
        error: updateError.message,
      });
    }

    // 如果提供了分期付款項目，則更新它們
    if (installments && installments.length > 0) {
      // 先刪除現有的分期付款項目
      const { error: deleteError } = await supabase
        .from("Installments")
        .delete()
        .eq("contract_id", id)
        .eq("user_id", userId);

      if (deleteError) {
        console.error("Error deleting existing installments:", deleteError);
        return res.status(500).json({
          success: false,
          message: "Failed to update installments",
          error: deleteError.message,
        });
      }

      // 添加新的分期付款項目
      const installmentItems = installments.map((item: any) => {
        const { installment_order, percentage, amount, payment_date } = item;
        return {
          user_id: userId,
          contract_id: id,
          installment_order,
          percentage,
          amount,
          payment_date,
        };
      });

      const { error: insertError } = await supabase
        .from("Installments")
        .insert(installmentItems);

      if (insertError) {
        console.error("Error inserting new installments:", insertError);
        return res.status(500).json({
          success: false,
          message: "Failed to update installments",
          error: insertError.message,
        });
      }
    }

    // 獲取更新後的完整合約信息
    const { data: updatedContract, error: fetchUpdatedError } = await supabase
      .from("Contracts")
      .select(
        `
        id,
        case_id,
        contract_number,
        contract_amount,
        note,
        created_at,
        user_id,
        case:Cases(id, name),
        installments:Installments(
            id,
            installment_order,
            percentage,
            amount,
            payment_date
        )
      `
      )
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (fetchUpdatedError) {
      console.error("Error fetching updated contract:", fetchUpdatedError);
      return res.status(500).json({
        success: false,
        message: "Contract updated but failed to fetch updated data",
        error: fetchUpdatedError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contract updated successfully",
      data: camelcaseKeys(updatedContract, { deep: true }),
    });
  } catch (error: any) {
    console.error("Error in updateContract:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Contract ID is required",
      });
    }

    // 檢查合約是否存在且屬於當前用戶
    const { data: existingContract, error: fetchError } = await supabase
      .from("Contracts")
      .select("id")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          message:
            "Contract not found or you don't have permission to delete it",
        });
      }

      console.error("Error fetching contract:", fetchError);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch contract",
        error: fetchError.message,
      });
    }

    // 先刪除關聯的分期付款項目
    const { error: deleteInstallmentsError } = await supabase
      .from("Installments")
      .delete()
      .eq("contract_id", id)
      .eq("user_id", userId);

    if (deleteInstallmentsError) {
      console.error("Error deleting installments:", deleteInstallmentsError);
      return res.status(500).json({
        success: false,
        message: "Failed to delete installments",
        error: deleteInstallmentsError.message,
      });
    }

    // 刪除合約
    const { error: deleteContractError } = await supabase
      .from("Contracts")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (deleteContractError) {
      console.error("Error deleting contract:", deleteContractError);
      return res.status(500).json({
        success: false,
        message: "Failed to delete contract",
        error: deleteContractError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contract deleted successfully",
    });
  } catch (error: any) {
    console.error("Error in deleteContract:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};
