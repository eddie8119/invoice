import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas/auth";

export const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 根據路徑選擇適當的 schema
    const schema = req.path.includes("register") ? registerSchema : loginSchema;

    // 驗證請求體
    await schema.parseAsync(req.body);

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.errors,
    });
  }
};
