import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "@/controllers/invoice";
import { authMiddleware } from "@/middleware/authMiddleware";
import express from "express";

const router = express.Router();

// 所有發票路由都需要身份驗證
router.use(authMiddleware);

router.get("/invoices", getInvoices);
router.get("/invoices/:id", getInvoice);
router.post("/invoices", createInvoice);
router.patch("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

export default router;
