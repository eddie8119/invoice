import { ID, Query } from "node-appwrite";
import { COLLECTIONS, DATABASE_ID, account, database } from "./appwrite";

interface User {
  $id: string;
  email: string;
}

interface UserDocument {
  userId: string;
  email: string;
  createdAt: string;
}

interface CreateUserResponse {
  user: User;
  //   userDoc: UserDocument;
}

interface LoginResponse {
  session: any;
  user: User;
}

export const userService = {
  // 創建用戶
  async createUser(
    email: string,
    password: string
  ): Promise<CreateUserResponse> {
    try {
      const user = await account.create(ID.unique(), email, password);

      // 在數據庫中創建用戶文檔
      await database.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        ID.unique(),
        {
          userId: user.$id,
          email: user.email,
          createdAt: new Date().toISOString(),
        }
      );

      return { user };
    } catch (error) {
      console.error("Create user error:", error);
      throw error;
    }
  },

  // 登入驗證
  async loginUser(email: string, password: string): Promise<LoginResponse> {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();

      return { session, user };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // 登出
  async logoutUser(): Promise<void> {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  // 獲取當前用戶
  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  },

  // 根據 email 獲取用戶文檔
  async getUserByEmail(email: string): Promise<UserDocument | null> {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        [Query.equal("email", email)]
      );

      return (response.documents[0] as unknown as UserDocument) || null;
    } catch (error) {
      console.error("Get user by email error:", error);
      throw error;
    }
  },

  // 根據 userId 獲取用戶文檔
  async getUserById(userId: string): Promise<UserDocument | null> {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        [Query.equal("userId", userId)]
      );

      return (response.documents[0] as unknown as UserDocument) || null;
    } catch (error) {
      console.error("Get user by ID error:", error);
      throw error;
    }
  },

  // 更新用戶信息
  async updateUser(
    documentId: string,
    updates: Partial<UserDocument>
  ): Promise<UserDocument> {
    try {
      const updatedDoc = await database.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        documentId,
        {
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      );

      return updatedDoc as unknown as UserDocument;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  },

  // 刪除用戶帳戶和文檔
  async deleteUser(documentId: string): Promise<boolean> {
    try {
      // 刪除用戶文檔
      await database.deleteDocument(DATABASE_ID, COLLECTIONS.USERS, documentId);

      // 刪除帳戶（需要管理員權限或用戶自己操作）
      // await account.delete();

      return true;
    } catch (error) {
      console.error("Delete user error:", error);
      throw error;
    }
  },

  // 檢查用戶是否存在
  async userExists(email: string): Promise<boolean> {
    try {
      const user = await this.getUserByEmail(email);
      return !!user;
    } catch (error) {
      console.error("Check user exists error:", error);
      return false;
    }
  },
};
