import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  updateCompany,
} from "@/controllers/company";
import { authMiddleware } from "@/middleware/auth";
import express from "express";

const router = express.Router();

// 所有發票路由都需要身份驗證
router.use(authMiddleware);

router.get("/companies", getCompanies);
router.get("/companies/:id", getCompany);
router.post("/companies", createCompany);
router.patch("/companies/:id", updateCompany);
router.delete("/companies/:id", deleteCompany);

export default router;
