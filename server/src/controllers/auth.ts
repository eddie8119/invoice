import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { userService } from "@/services/appwrite/userService";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppwriteException } from "node-appwrite";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// 生成 JWT token 的輔助函數
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

// 處理 Appwrite 錯誤的輔助函數
const handleAppwriteError = (
  error: any,
  res: Response,
  defaultMessage: string
) => {
  if (error instanceof AppwriteException) {
    return res.status(400).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }

  console.error("Unexpected error:", error);
  return res.status(500).json({
    success: false,
    message: defaultMessage,
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body as RegisterSchema;

    // 檢查用戶是否已存在
    const existingUser = await userService.userExists(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // 使用 userService 創建用戶
    const { user, userDoc } = await userService.createUser(
      email,
      password,
      name
    );

    // 生成 JWT token
    const token = generateToken(user.$id);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.$id,
          email: user.email,
          name: user.name,
          createdAt: user.$createdAt,
        },
        userDoc: {
          id: userDoc.$id,
          userId: userDoc.userId,
          email: userDoc.email,
          createdAt: userDoc.createdAt,
        },
        token,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    handleAppwriteError(error, res, "Registration failed");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginSchema;

    // 使用 userService 登入
    const { session, user } = await userService.loginUser(email, password);

    // 獲取用戶文檔信息
    const userDoc = await userService.getUserById(user.$id);

    // 生成 JWT token
    const token = generateToken(user.$id);

    res.json({
      success: true,
      data: {
        user: {
          id: user.$id,
          email: user.email,
          name: user.name,
          createdAt: user.$createdAt,
        },
        userDoc: userDoc
          ? {
              id: userDoc.$id,
              userId: userDoc.userId,
              email: userDoc.email,
              createdAt: userDoc.createdAt,
            }
          : null,
        token,
        sessionId: session.$id,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AppwriteException) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // 使用 userService 登出
    await userService.logoutUser();

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

// 獲取當前用戶信息
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getCurrentUser();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No active session",
      });
    }

    // 獲取用戶文檔信息
    const userDoc = await userService.getUserById(user.$id);

    res.json({
      success: true,
      data: {
        user: {
          id: user.$id,
          email: user.email,
          name: user.name,
          createdAt: user.$createdAt,
        },
        userDoc: userDoc
          ? {
              id: userDoc.$id,
              userId: userDoc.userId,
              email: userDoc.email,
              createdAt: userDoc.createdAt,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get user information",
    });
  }
};

// 更新用戶信息
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.params;
    const updates = req.body;

    // 移除敏感字段
    const { password, userId, ...safeUpdates } = updates;

    const updatedUserDoc = await userService.updateUser(
      documentId,
      safeUpdates
    );

    res.json({
      success: true,
      data: {
        userDoc: updatedUserDoc,
      },
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Update user error:", error);
    handleAppwriteError(error, res, "Failed to update user");
  }
};

// 刪除用戶
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.params;

    await userService.deleteUser(documentId);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    handleAppwriteError(error, res, "Failed to delete user");
  }
};

// 檢查用戶是否存在
export const checkUserExists = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const exists = await userService.userExists(email);

    res.json({
      success: true,
      data: {
        exists,
      },
    });
  } catch (error) {
    console.error("Check user exists error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check user existence",
    });
  }
};
