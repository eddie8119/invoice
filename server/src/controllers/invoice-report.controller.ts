import { supabase } from "@/lib/supabase";
import camelcaseKeys from "camelcase-keys";
import { Request, Response } from "express";

// 獲取指定數量的各月金錢總額
export const getBalanceByMonthRange = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { monthsCount } = req.query;

    // 獲取當前日期
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-11

    // 創建一個包含所有月份的數組
    const results = [];
    for (let i = 0; i < Number(monthsCount); i++) {
      const targetDate = new Date(currentYear, currentMonth + i, 1);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth() + 1; // 轉為 1-12

      // 計算月份的開始和結束日期
      const startOfMonth = new Date(year, month - 1, 1); // 月份開始日期
      const endOfMonth = new Date(year, month, 0); // 月份最後一天

      // 查詢該月的發票總額，包含類型
      const { data, error } = await supabase
        .from("Invoices")
        .select("total_amount, type")
        .eq("user_id", userId)
        .gte("due_date", startOfMonth.toISOString())
        .lte("due_date", endOfMonth.toISOString());

      if (error) {
        throw error;
      }

      // 計算應收和應付總額
      let receivableTotal = 0;
      let payableTotal = 0;

      data?.forEach((invoice) => {
        if (invoice.type === "receivable") {
          receivableTotal += Number(invoice.total_amount);
        } else if (invoice.type === "payable") {
          payableTotal += Number(invoice.total_amount);
        }
      });

      // 計算收支差額
      const balanceGap = receivableTotal - payableTotal;

      // 格式化月份名稱
      const monthName = `${year}/${month}`;
      const label = i === 0 ? "本月" : i === 1 ? "下月" : "後月";

      results.push({
        year,
        month,
        monthName,
        label,
        receivableTotal,
        payableTotal,
        balanceGap,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error getting monthly balance:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get monthly balance",
    });
  }
};

// 獲取指定數量的各月的所有發票
export const getInvoicesByMonthRange = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { monthsCount = 3 } = req.query;
    const count = Number(monthsCount);

    // 獲取當前日期
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-11

    // 創建一個包含所有月份的數組
    const monthsArray = [];
    for (let i = 0; i < count; i++) {
      const targetDate = new Date(currentYear, currentMonth + i, 1);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth() + 1; // 轉為 1-12

      // 計算月份的開始和結束日期
      const startOfMonth = new Date(year, month - 1, 1); // 月份開始日期
      const endOfMonth = new Date(year, month, 0); // 月份最後一天

      monthsArray.push({
        year,
        month,
        startDate: startOfMonth.toISOString().split("T")[0],
        endDate: endOfMonth.toISOString().split("T")[0],
      });
    }

    // 構建查詢條件：獲取這些月份範圍內的所有發票
    let query = supabase
      .from("Invoices")
      .select(
        `
      id,
      invoice_number,
      due_date,
      total_amount,
      status,
      case_id,
      paid_at,
      company:Companies(id, name),
      type
      `
      )
      .eq("user_id", userId);

    // 構建日期範圍條件：從第一個月的開始日期到最後一個月的結束日期
    const firstMonth = monthsArray[0];
    const lastMonth = monthsArray[monthsArray.length - 1];

    query = query
      .gte("due_date", firstMonth.startDate)
      .lte("due_date", lastMonth.endDate);

    // 執行查詢
    const { data, error } = await query.order("due_date", { ascending: true });

    if (error) {
      throw error;
    }

    // 將結果轉換為駝峰命名
    const invoices = camelcaseKeys(data || [], { deep: true });

    // 按月份分組發票
    const invoicesByMonth = monthsArray.map((monthInfo) => {
      const { year, month, startDate, endDate } = monthInfo;
      const monthInvoices = invoices.filter((invoice) => {
        const dueDate = new Date(invoice.dueDate);
        return dueDate >= new Date(startDate) && dueDate <= new Date(endDate);
      });

      return {
        year,
        month,
        monthName: `${year}/${month}`,
        invoices: monthInvoices,
      };
    });

    return res.status(200).json({
      success: true,
      data: invoicesByMonth,
    });
  } catch (error) {
    console.error("Error getting monthly invoices:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get monthly invoices",
    });
  }
};
