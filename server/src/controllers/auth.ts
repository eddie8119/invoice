import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppwriteException } from "node-appwrite";
import { LoginSchema, RegisterSchema } from "../schemas/auth";
import { account, userService } from "../services/appwrite";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as RegisterSchema;

    // 使用 Appwrite 創建用戶
    const user = await userService.createUser(email, password);

    // 生成 JWT token
    const token = jwt.sign({ userId: user.$id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.$id,
          email: user.email,
          createdAt: user.$createdAt,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    if (error instanceof AppwriteException) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginSchema;

    // 使用 Appwrite 創建 session
    const session = await account.createEmailSession(email, password);

    // 獲取用戶信息
    const user = await account.get();

    // 生成 JWT token
    const token = jwt.sign({ userId: user.$id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.$id,
          email: user.email,
          createdAt: user.$createdAt,
        },
        token,
        session: session.$id,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AppwriteException) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // 刪除當前 session
    await account.deleteSession("current");

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
