import { supabase } from "@/lib/supabase";
import { getUserIdOrUnauthorized } from "@/utils/auth";
import camelcaseKeys from "camelcase-keys";
import { Request, Response } from "express";
import snakecaseKeys from "snakecase-keys";

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    let query = supabase
      .from("Companies")
      .select(
        `
        id,
        name,
        address,
        phone,
        email,
        contact_person,
        created_at,
        updated_at,
        user_id,
        cases:Cases (
          id,
          name
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    const { data: companiesData, error } = await query;

    if (error) {
      console.error("Error fetching companies:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch companies",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: camelcaseKeys(companiesData, { deep: true }),
    });
  } catch (error: any) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch companies",
      error: error.message,
    });
  }
};

export const getCompany = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    const { id } = req.params;

    let query = supabase
      .from("Companies")
      .select(
        `
        id,
        name,
        address,
        phone,
        email,
        contact_person,
        created_at,
        updated_at,
        user_id,
        cases:Cases (
          id,
          name
        )
      `
      )
      .eq("user_id", userId)
      .eq("id", id)
      .single();

    const { data: companyData, error } = await query;

    if (error) {
      console.error("Error fetching company:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch company",
        error: error.message,
      });
    }

    if (!companyData) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: camelcaseKeys(companyData, { deep: true }),
    });
  } catch (error: any) {
    console.error("Error fetching company:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch company",
      error: error.message,
    });
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    const snakeCaseData = snakecaseKeys(req.body, { deep: true });
    const { name, address, phone, email, contact_person } = snakeCaseData;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const { data: existingCompany } = await supabase
      .from("Companies")
      .select("id")
      .eq("name", name)
      .eq("user_id", userId)
      .maybeSingle();

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: "Company already exists",
      });
    }

    const { data: newCompanyData, error: companyCreateError } = await supabase
      .from("Companies")
      .insert([
        {
          name,
          address,
          phone,
          email,
          contact_person,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (companyCreateError) {
      console.error("Error updating company:", companyCreateError);
      return res.status(500).json({
        success: false,
        message: "Failed to update company",
        error: companyCreateError.message,
      });
    }

    return res.status(201).json({
      success: true,
      data: camelcaseKeys(newCompanyData, { deep: true }),
    });
  } catch (error: any) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update company",
      error: error.message,
    });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    const { id } = req.params;
    const { name, address, phone, email, contact_person } = req.body;

    const { data: existingCompany } = await supabase
      .from("Companies")
      .select("id, name")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (!existingCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found or you don't have permission to update it",
      });
    }

    const { data: companyData, error } = await supabase
      .from("Companies")
      .update({ name, address, phone, email, contact_person })
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error updating company:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update company",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: camelcaseKeys(companyData, { deep: true }),
    });
  } catch (error: any) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update company",
      error: error.message,
    });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdOrUnauthorized(req, res);
    if (!userId) return;

    const { id } = req.params;

    const { error } = await supabase
      .from("Companies")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting company:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete company",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting company:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete company",
      error: error.message,
    });
  }
};
