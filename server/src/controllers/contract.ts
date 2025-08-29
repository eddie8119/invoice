import { supabase } from "@/lib/supabase";
import { getUserIdOrUnauthorized } from "@/utils/auth";
import camelcaseKeys from "camelcase-keys";
import { Request, Response } from "express";

export const getContracts = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    let query = supabase
      .from("Contracts")
      .select(
        `
        id,
        case_name,
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

export const createContract = async () => {};

export const updateContract = async () => {};

export const deleteContract = async () => {};
