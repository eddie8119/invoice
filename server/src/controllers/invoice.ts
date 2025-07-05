import { supabase } from "@/lib/supabase";
import { Request, Response } from "express";

// 獲取當前用戶的所有發票列表
export const getInvoices = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    let query = supabase.from("Invoices").select(
      `
      id,
      invoice_number,
      issue_date,
      due_date,
      total_amount,
      currency,
      status,
      notes,
      created_at,
      company:Companies(id, name)
    `
    );

    // 獲取查詢參數
    const { month, type = "receivable" } = req.query;

    // 增加用戶 ID 過濾條件
    query = query.eq("user_id", userId);

    // 增加發票類型過濾條件
    if (
      typeof type === "string" &&
      (type === "receivable" || type === "payable")
    ) {
      query = query.eq("type", type);
    }

    // 有傳 month 才加上月份條件
    if (typeof month === "string") {
      // 計算該月的第一天和下個月的第一天
      const startDate = `${month}-01`;
      const endDate = new Date(
        new Date(startDate).setMonth(new Date(startDate).getMonth() + 1)
      )
        .toISOString()
        .slice(0, 10);

      query = query.gte("issue_date", startDate).lt("issue_date", endDate);
    }

    // 按創建時間降序排序
    query = query.order("created_at", { ascending: false });

    const { data: invoices, error } = await query;

    if (error) {
      console.error("Error fetching invoices:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch invoices",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error: any) {
    console.error("Error in getInvoices:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

// 獲取單個發票的詳細信息，包括公司信息和發票項目
export const getInvoice = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    // 獲取發票詳情，包含公司信息和發票項目
    const { data: invoice, error } = await supabase
      .from("Invoices")
      .select(
        `
        *,
        company:Companies(*),
        items:InvoiceItems(*)
      `
      )
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching invoice:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch invoice",
        error: error.message,
      });
    }

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error: any) {
    console.error("Error in getInvoice:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

// 創建新發票，包括發票項目
export const createInvoice = async (req: Request, res: Response) => {
  // 開始一個事務，確保所有操作都成功或都失敗
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      company_id,
      invoice_number,
      issue_date,
      due_date,
      currency = "TWD",
      status = "unpaid",
      notes,
      items,
    } = req.body;

    // 驗證必要欄位
    if (
      !company_id ||
      !invoice_number ||
      !due_date ||
      !items ||
      !Array.isArray(items)
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // 計算總金額
    const total_amount = items.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0
    );

    // 插入發票主記錄
    const { data: invoice, error: invoiceError } = await supabase
      .from("Invoices")
      .insert([
        {
          user_id: userId,
          company_id,
          invoice_number,
          issue_date: issue_date || new Date().toISOString().split("T")[0],
          due_date,
          total_amount,
          currency,
          status,
          notes,
        },
      ])
      .select()
      .single();

    if (invoiceError) {
      console.error("Error creating invoice:", invoiceError);
      return res.status(500).json({
        success: false,
        message: "Failed to create invoice",
        error: invoiceError.message,
      });
    }

    // 插入發票項目
    const invoiceItems = items.map((item) => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
    }));

    const { error: itemsError } = await supabase
      .from("InvoiceItems")
      .insert(invoiceItems);

    if (itemsError) {
      console.error("Error creating invoice items:", itemsError);
      // 如果插入項目失敗，我們應該刪除剛才創建的發票
      await supabase.from("Invoices").delete().eq("id", invoice.id);

      return res.status(500).json({
        success: false,
        message: "Failed to create invoice items",
        error: itemsError.message,
      });
    }

    // 獲取完整的發票信息，包括項目和公司
    const { data: completeInvoice, error: fetchError } = await supabase
      .from("Invoices")
      .select(
        `
        *,
        company:Companies(*),
        items:InvoiceItems(*)
      `
      )
      .eq("id", invoice.id)
      .single();

    if (fetchError) {
      console.error("Error fetching complete invoice:", fetchError);
      return res.status(500).json({
        success: false,
        message: "Invoice created but failed to fetch complete data",
        error: fetchError.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: completeInvoice,
    });
  } catch (error: any) {
    console.error("Error in createInvoice:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

// 更新發票信息
export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const {
      company_id,
      invoice_number,
      issue_date,
      due_date,
      currency,
      status,
      notes,
      items,
    } = req.body;

    // 檢查發票是否存在並屬於當前用戶
    const { data: existingInvoice, error: checkError } = await supabase
      .from("Invoices")
      .select("id")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (checkError || !existingInvoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found or you don't have permission to update it",
      });
    }

    // 準備更新的發票數據
    const invoiceData: any = {};
    if (company_id !== undefined) invoiceData.company_id = company_id;
    if (invoice_number !== undefined)
      invoiceData.invoice_number = invoice_number;
    if (issue_date !== undefined) invoiceData.issue_date = issue_date;
    if (due_date !== undefined) invoiceData.due_date = due_date;
    if (currency !== undefined) invoiceData.currency = currency;
    if (status !== undefined) invoiceData.status = status;
    if (notes !== undefined) invoiceData.notes = notes;

    // 如果有項目更新，重新計算總金額
    if (items && Array.isArray(items)) {
      invoiceData.total_amount = items.reduce(
        (sum, item) => sum + item.quantity * item.unit_price,
        0
      );

      // 刪除現有項目
      const { error: deleteError } = await supabase
        .from("InvoiceItems")
        .delete()
        .eq("invoice_id", id);

      if (deleteError) {
        console.error("Error deleting existing invoice items:", deleteError);
        return res.status(500).json({
          success: false,
          message: "Failed to update invoice items",
          error: deleteError.message,
        });
      }

      // 插入新項目
      const invoiceItems = items.map((item) => ({
        invoice_id: id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
      }));

      const { error: itemsError } = await supabase
        .from("InvoiceItems")
        .insert(invoiceItems);

      if (itemsError) {
        console.error("Error updating invoice items:", itemsError);
        return res.status(500).json({
          success: false,
          message: "Failed to update invoice items",
          error: itemsError.message,
        });
      }
    }

    // 更新發票主記錄
    if (Object.keys(invoiceData).length > 0) {
      const { error: updateError } = await supabase
        .from("Invoices")
        .update(invoiceData)
        .eq("id", id);

      if (updateError) {
        console.error("Error updating invoice:", updateError);
        return res.status(500).json({
          success: false,
          message: "Failed to update invoice",
          error: updateError.message,
        });
      }
    }

    // 獲取更新後的完整發票信息
    const { data: updatedInvoice, error: fetchError } = await supabase
      .from("Invoices")
      .select(
        `
        *,
        company:Companies(*),
        items:InvoiceItems(*)
      `
      )
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching updated invoice:", fetchError);
      return res.status(500).json({
        success: false,
        message: "Invoice updated but failed to fetch updated data",
        error: fetchError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: updatedInvoice,
    });
  } catch (error: any) {
    console.error("Error in updateInvoice:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

// 刪除發票
export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    // 檢查發票是否存在並屬於當前用戶
    const { data: existingInvoice, error: checkError } = await supabase
      .from("Invoices")
      .select("id")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (checkError || !existingInvoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found or you don't have permission to delete it",
      });
    }

    // 刪除發票（因為設置了 ON DELETE CASCADE，相關的 InvoiceItems 會自動刪除）
    const { error: deleteError } = await supabase
      .from("Invoices")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting invoice:", deleteError);
      return res.status(500).json({
        success: false,
        message: "Failed to delete invoice",
        error: deleteError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error: any) {
    console.error("Error in deleteInvoice:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};
