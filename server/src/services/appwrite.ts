import { Account, Client, Databases, ID } from "node-appwrite";

// 初始化 Appwrite 客戶端
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID || "")
  .setKey(process.env.APPWRITE_API_KEY || "");

// 初始化 Appwrite 服務
export const account = new Account(client);
export const database = new Databases(client);

// 數據庫配置
export const COLLECTIONS = {
  USERS: process.env.APPWRITE_USERS_COLLECTION_ID || "",
};

export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";

// 用戶相關操作
export const userService = {
  // 創建用戶
  async createUser(email: string, password: string) {
    try {
      // 創建用戶帳號
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

      return user;
    } catch (error) {
      console.error("Create user error:", error);
      throw error;
    }
  },

  // 獲取用戶信息
  async getUserByEmail(email: string) {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        [
          // Query.equal('email', email),
        ]
      );

      return response.documents.find((doc) => doc.email === email);
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  },
};
