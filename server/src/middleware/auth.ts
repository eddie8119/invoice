import { supabase } from "@/lib/supabase";
import { getUserIdOrUnauthorized } from "@/utils/auth";
import { NextFunction, Request, Response } from "express";

/**
 * 驗證用戶身份並將用戶信息附加到 request 對象上
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 從請求頭中獲取 token
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No authentication token provided",
      });
    }

    // 驗證 token 並獲取用戶信息
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token",
      });
    }

    const { user } = data;
    // 驗證完 JWT（或 session），就會把解析出來的用戶資訊 將用戶信息附加到 request 對象上
    // 一次驗證，全程可用
    req.user = {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.name,
    };

    next();
  } catch (error: any) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

export function requireUserId(req: Request, res: Response, next: NextFunction) {
  const userId = getUserIdOrUnauthorized(req, res);
  if (!userId) return; // 已經回應 401
  // 可以掛到 req 上，讓後續 handler 直接用
  (req as any).userId = userId;
  next();
}
