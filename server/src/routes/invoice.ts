import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "@/controllers/invoice";

import {
  getBalanceByMonthRange,
  getInvoicesByMonthRange,
} from "@/controllers/invoice-report";
import { authMiddleware, requireUserId } from "@/middleware/auth";
import express from "express";

const router = express.Router();

// 所有發票路由都需要身份驗證
router.use(authMiddleware);

router.get("/invoices", requireUserId, getInvoices);
router.get("/invoices/:id", requireUserId, getInvoice);
router.post("/invoices", requireUserId, createInvoice);
router.patch("/invoices/:id", requireUserId, updateInvoice);
router.delete("/invoices/:id", requireUserId, deleteInvoice);

router.get("/monthly-balance", requireUserId, getBalanceByMonthRange);
router.get("/monthly-invoices", requireUserId, getInvoicesByMonthRange);

export default router;
