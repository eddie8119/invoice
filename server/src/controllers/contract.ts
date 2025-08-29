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
        project_name,
        contract_number,
        contract_amount,
        note,
        created_at,
        user_id,
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

export const getContract = async () => {};

export const createContract = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    const snakeCaseData = snakecaseKeys(req.body, { deep: true });
    const {
      project_name,
      contract_number,
      contract_amount,
      note,
      installments,
    } = snakeCaseData;

    // 驗證必要欄位
    if (!project_name || !contract_amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // 步驟 1: 創建合約
    const { data: contractData, error: contractError } = await supabase
      .from("Contracts")
      .insert([
        {
          project_name,
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

    // 步驟 3: 獲取完整的合約信息（包括分期付款項目）
    const { data: completeContract, error: fetchError } = await supabase
      .from("Contracts")
      .select(
        `
        id,
        project_name,
        contract_number,
        contract_amount,
        note,
        created_at,
        user_id,
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

export const updateContract = async () => {};

export const deleteContract = async () => {};
