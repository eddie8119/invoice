import dotenv from "dotenv";
dotenv.config();
// 細微的 Node.js 執行順序問題
// 若放在下面  dotenv.config() 根本還沒有機會執行 token拿到的是 undefined，於是它默默地降級成使用匿名金鑰。
import routes from "@/routes/index";
import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 順序觀念
// 它會立刻去載入 routes/index.ts
// routes/index.ts 又會去 import 你的 invoiceController。
// invoiceController 接著 import 你的 supabase 客戶端。
// 在 lib/supabase.ts 中，createClient(...) 這行程式碼被立即執行。此時，它嘗試讀取 process.env.SUPABASE_SERVICE_ROLE_KEY。
// 然而，因為這一切都發生在 import 階段，app.ts 中第 6 行的 dotenv.config() 根本還沒有機會執行！
// 結果就是 createClient 拿到的是 undefined，於是它默默地降級成使用匿名金鑰。
