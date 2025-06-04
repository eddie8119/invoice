import { Account, Client, Databases } from "node-appwrite";

// 初始化 Appwrite 客戶端
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

// 初始化 Appwrite 服務
export const account = new Account(client);
export const database = new Databases(client);

// 數據庫配置
export const COLLECTIONS = {
  USERS: process.env.APPWRITE_USERS_COLLECTION_ID!,
};

export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
