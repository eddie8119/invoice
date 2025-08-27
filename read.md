# Invoice Management App (Invoice-Scort)

## 1. 產品概述

本專案是一個發票管理工具，旨在幫助使用者輕鬆管理廠商發票。核心功能包括：

- **影像辨識**：透過掃描紙本發票，自動擷取發票資訊。
- **發票管理**：追蹤發票金額、付款狀態。
- **簡易報表**：將發票資料整理成清晰的報表。

## 2. 技術架構

本專案採用前後端分離的架構。

### 前端 (Client)

- **框架**: React Native (使用 Expo)
- **語言**: TypeScript
- **狀態管理**: React Hooks (useState, useEffect, useContext)
- **路由**: Expo Router
- **API 通訊**: Axios
- **UI 元件**: 自訂 UI 元件

### 後端 (Server)

- **框架**: Node.js + Express
- **語言**: TypeScript
- **API 風格**: RESTful API
- **資料庫**: Supabase (PostgreSQL)
- **身份驗證**: Supabase Auth (JWT)

## 3. 資料庫設計 (Supabase)

資料庫包含四個主要資料表，並已啟用 RLS (Row Level Security) 以確保資料隔離。

- **`Users`**: 儲存使用者基本資料，與 `auth.users` 表關聯。
- **`Companies`**: 儲存使用者擁有的公司資料。
- **`Invoices`**: 儲存發票主體資訊。
- **`InvoiceItems`**: 儲存發票的項目明細。

### 關聯關係

- `Users` (1) -> (N) `Companies` (外鍵: `Companies.user_id`)
- `Companies` (1) -> (N) `Invoices` (外鍵: `Invoices.company_id`)
- `Users` (1) -> (N) `Invoices` (外鍵: `Invoices.user_id`)
- `Invoices` (1) -> (N) `InvoiceItems` (外鍵: `InvoiceItems.invoice_id`)

## 4. 後端 API 設計

後端 API 遵循 RESTful 設計原則，主要資源為 `invoices`。

### 身份驗證

- 使用 `authMiddleware` 中間件，透過請求 Header 中的 `Authorization: Bearer <JWT>` 來驗證使用者身份。
- 驗證成功後，會將用戶資訊附加到 `req.user` 物件，供後續的 Controller 使用。

### 主要 API 端點 (`/api/invoices`)

| 動作         | HTTP 方法 | 路徑            | 說明                                                               |
| ------------ | --------- | --------------- | ------------------------------------------------------------------ |
| 獲取發票列表 | `GET`     | `/invoices`     | 獲取當前用戶的所有發票。可選 `?month=YYYY-MM` 參數來篩選特定月份。 |
| 獲取單張發票 | `GET`     | `/invoices/:id` | 獲取單張發票的詳細資訊，包含公司與項目明細。                       |
| 建立新發票   | `POST`    | `/invoices`     | 建立一張新發票，需傳入發票主體與項目明細。                         |
| 更新發票     | `PATCH`   | `/invoices/:id` | 部分更新發票資訊。                                                 |
| 刪除發票     | `DELETE`  | `/invoices/:id` | 刪除一張發票及其所有相關的項目明細。                               |

## 5. 專案設定與啟動

### 環境變數

在 `server` 目錄下建立 `.env` 檔案，並填入 Supabase 相關金鑰：

```
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

### 安裝依賴

在專案根目錄執行：

```bash
npm install
```

### 啟動專案

- **啟動後端伺服器**:
  ```bash
  npm run dev --workspace=server
  ```
- **啟動前端 App (Expo)**:
  ```bash
  npm run start --workspace=client
  ```

## 6. 核心功能流程

1. **使用者註冊/登入**: 前端呼叫後端 Auth API，後端使用 Supabase Auth 處理，成功後返回 JWT。
2. **儲存 Token**: 前端將 JWT 儲存在本地 (e.g., SecureStore)。
3. **API 請求**: 前端發送 API 請求時，在 Header 中帶上 JWT。
4. **後端驗證**: 後端的 `authMiddleware` 驗證 JWT，並將 `user` 資訊附加到 `req`。
5. **資料庫操作**: Controller 從 `req.user.id` 取得用戶 ID，進行資料庫查詢或操作，確保用戶只能存取自己的資料。

## 7. 功能開發決策

1. **移除明細表單**: 結款時 人們只會針對總價核對 明細不是這裡要看的重點。
