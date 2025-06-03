import * as dotenv from "dotenv";
import { Client, Databases, Permission, Role } from "node-appwrite";
import path from "path";

// 載入環境變數
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// 初始化 Appwrite 客戶端
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID || "")
  .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

// 資料庫和集合 ID
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "invoice_db";
const COLLECTION_USERS = process.env.APPWRITE_USERS_COLLECTION_ID || "users";
const COLLECTION_INVOICES = "invoices";
const COLLECTION_ITEMS = "invoice_items";

// 權限設定
const readWritePermission = (userId: string) => [
  Permission.read(Role.user(userId)),
  Permission.write(Role.user(userId)),
  Permission.delete(Role.user(userId)),
  Permission.update(Role.user(userId)),
];

async function initDatabase() {
  try {
    console.log("🚀 開始初始化資料庫...");

    // 檢查資料庫是否存在，不存在則建立
    try {
      await databases.get(DATABASE_ID);
      console.log(`✅ 資料庫 ${DATABASE_ID} 已存在`);
    } catch (error: any) {
      if (error.code === 404) {
        await databases.create(DATABASE_ID, "Invoice Database");
        console.log(`✅ 已建立資料庫: ${DATABASE_ID}`);
      } else {
        throw error;
      }
    }

    // 1. 建立 Users 集合
    await createCollection(
      COLLECTION_USERS,
      "Users",
      [
        { key: "userId", type: "string", required: true, size: 255 },
        { key: "email", type: "string", required: true, size: 255 },
        { key: "name", type: "string", required: true, size: 255 },
        { key: "company", type: "string", required: false, size: 255 },
        { key: "phone", type: "string", required: false, size: 50 },
        { key: "address", type: "string", required: false, size: 500 },
      ],
      false // 不允許用戶直接寫入
    );

    // 2. 建立 Invoices 集合
    await createCollection(
      COLLECTION_INVOICES,
      "Invoices",
      [
        { key: "userId", type: "string", required: true, size: 255 },
        { key: "invoiceNumber", type: "string", required: true, size: 100 },
        { key: "issueDate", type: "datetime", required: true },
        { key: "dueDate", type: "datetime", required: true },
        { key: "status", type: "string", required: true, size: 50 }, // draft, sent, paid, cancelled
        { key: "subtotal", type: "double", required: true },
        { key: "tax", type: "double", required: true },
        { key: "total", type: "double", required: true },
        { key: "notes", type: "string", required: false, size: 1000 },
        { key: "clientName", type: "string", required: true, size: 255 },
        { key: "clientEmail", type: "string", required: true, size: 255 },
        { key: "clientAddress", type: "string", required: false, size: 500 },
      ],
      true
    );

    // 3. 建立 Invoice Items 集合
    await createCollection(
      COLLECTION_ITEMS,
      "Invoice Items",
      [
        { key: "invoiceId", type: "string", required: true, size: 255 },
        { key: "description", type: "string", required: true, size: 1000 },
        { key: "quantity", type: "double", required: true },
        { key: "unitPrice", type: "double", required: true },
        { key: "amount", type: "double", required: true },
      ],
      true
    );

    console.log("🎉 資料庫初始化完成！");
  } catch (error) {
    console.error("❌ 初始化資料庫時發生錯誤:", error);
    process.exit(1);
  }
}

async function createCollection(
  collectionId: string,
  name: string,
  attributes: Array<{
    key: string;
    type: string;
    required: boolean;
    size?: number;
  }>,
  userWritable: boolean
) {
  try {
    // 檢查集合是否存在
    try {
      await databases.getCollection(DATABASE_ID, collectionId);
      console.log(`✅ 集合 ${name} 已存在`);
      return;
    } catch (error: any) {
      if (error.code !== 404) throw error;
    }

    // 建立集合
    const collection = await databases.createCollection(
      DATABASE_ID,
      collectionId,
      name,
      [
        // 權限設定
        Permission.read(Role.any()), // 任何人都可以讀取
        userWritable
          ? Permission.write(Role.users()) // 登入用戶可寫入
          : Permission.write(Role.team("admin")), // 只有管理員可寫入
      ]
    );

    console.log(`✅ 已建立集合: ${name}`);

    // 添加屬性
    for (const attr of attributes) {
      try {
        switch (attr.type) {
          case "string":
            await databases.createStringAttribute(
              DATABASE_ID,
              collection.$id,
              attr.key,
              attr.size || 255,
              attr.required
            );
            break;
          case "datetime":
            await databases.createDatetimeAttribute(
              DATABASE_ID,
              collection.$id,
              attr.key,
              attr.required
            );
            break;
          case "double":
            await databases.createFloatAttribute(
              DATABASE_ID,
              collection.$id,
              attr.key,
              attr.required
            );
            break;
          case "boolean":
            await databases.createBooleanAttribute(
              DATABASE_ID,
              collection.$id,
              attr.key,
              attr.required
            );
            break;
        }
        console.log(`   - 已添加屬性: ${attr.key} (${attr.type})`);
      } catch (error: any) {
        console.warn(`   ⚠️ 添加屬性 ${attr.key} 時出錯:`, error.message);
      }
    }

    // 建立索引
    if (collectionId === COLLECTION_INVOICES) {
      await databases.createIndex(
        DATABASE_ID,
        collection.$id,
        "idx_user_invoices",
        "key",
        ["userId"],
        ["ASC"]
      );
      console.log("   - 已建立索引: idx_user_invoices");
    }

    if (collectionId === COLLECTION_ITEMS) {
      await databases.createIndex(
        DATABASE_ID,
        collection.$id,
        "idx_invoice_items",
        "key",
        ["invoiceId"],
        ["ASC"]
      );
      console.log("   - 已建立索引: idx_invoice_items");
    }
  } catch (error) {
    console.error(`❌ 建立集合 ${name} 時發生錯誤:`, error);
    throw error;
  }
}

// 執行初始化
initDatabase();
