import { supabase } from "@/lib/supabase";
import { LoginSchema } from "@shared/schemas/loginSchema";
import { RegisterSchema } from "@shared/schemas/registerSchema";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body as RegisterSchema;
    // 使用 admin client 建立使用者
    const { data: authData, error: signUpError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { name },
        email_confirm: true, //todo
      });

    if (signUpError || !authData.user) {
      // 檢查是否因為 email 已存在而失敗
      if (signUpError?.message.includes("already exists")) {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists",
        });
      }
      return res.status(400).json({
        success: false,
        message: signUpError?.message || "Failed to register user",
      });
    }

    // 在 users 資料表中新增對應的 profile
    const { data: userDoc, error: docError } = await supabase
      .from("users")
      .insert([{ id: authData.user.id, email, name }])
      .select()
      .maybeSingle();

    if (docError) {
      // 如果 profile 建立失敗，刪除剛建立的 auth user 以保持資料一致性
      await supabase.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({
        success: false,
        message: `Failed to create user profile: ${docError.message}`,
      });
    }

    // 建立使用者後，自動登入以取得 session tokens
    const { data: sessionData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError || !sessionData.session) {
      return res.status(500).json({
        success: false,
        message:
          signInError?.message || "Auto-login failed after registration.",
      });
    }

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name,
          createdAt: authData.user.created_at,
        },
        userDoc,
        access_token: sessionData.session.access_token,
        refresh_token: sessionData.session.refresh_token,
      },
      message: "User registered and logged in successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed due to an unexpected error.",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginSchema;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.session || !data.user) {
      return res.status(401).json({
        success: false,
        message: error?.message || "Invalid email or password",
      });
    }

    const { data: userDoc } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .maybeSingle();

    res.json({
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name,
          createdAt: data.user.created_at,
        },
        userDoc,
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      // 讓指定的 access token 失效
      await supabase.auth.signOut();
    }
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
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({
        success: false,
        message: authError?.message || "Invalid token or user not found",
      });
    }

    const { data: userDoc } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name,
          createdAt: user.created_at,
        },
        userDoc,
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

// 更新用戶信息 (僅限本人)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const updates = req.body;
    // 不允許透過此 API 更新密碼或 email
    const { password, email, ...safeUpdates } = updates;

    const { data: updatedUserDoc, error: updateError } = await supabase
      .from("users")
      .update(safeUpdates)
      .eq("id", user.id) // 使用 token 中的 user.id 確保安全性
      .select()
      .maybeSingle();

    if (updateError) {
      return res
        .status(400)
        .json({ success: false, message: updateError.message });
    }

    res.json({
      success: true,
      data: { userDoc: updatedUserDoc },
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

// 刪除用戶 (僅限本人)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const userId = user.id;

    // 1. 刪除 Supabase Auth user (這會觸發級聯刪除 users 表中的對應資料，如果已設定)
    const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(
      userId
    );

    if (deleteAuthError) {
      // 如果 Auth user 刪除失敗，就不繼續刪 profile
      return res
        .status(500)
        .json({ success: false, message: deleteAuthError.message });
    }

    // 2. 刪除 profile table 中的資料 (如果沒有設定級聯刪除，則需要手動刪除)
    const { error: docError } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (docError) {
      // Log the detailed error for debugging
      console.error(
        `Profile deletion error for user ${userId} after auth user deletion:`,
        docError
      );
      // 注意：此時 Auth user 已被刪除，但 profile 刪除失敗，需要手動處理
      return res.status(500).json({
        success: false,
        message: `Auth user deleted, but failed to delete profile: ${docError.message}`,
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// 檢查用戶是否存在 (公開)
export const checkUserExists = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    // 改為查詢 public.users 資料表，這是更可靠且型別安全的方法
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      // 如果查詢出錯，不應該讓客戶端知道詳細信息
      console.error("Check user exists query error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error checking user existence." });
    }

    res.json({
      success: true,
      data: {
        exists: data !== null, // 如果能找到資料 (不為 null)，代表使用者存在
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
