import {
  createContract,
  deleteContract,
  getContract,
  getContracts,
  updateContract,
} from "@/controllers/contract";
import { authMiddleware } from "@/middleware/auth";
import express from "express";

const router = express.Router();

// 所有發票路由都需要身份驗證
router.use(authMiddleware);

router.get("/contracts", getContracts);
router.get("/contracts/:id", getContract);
router.post("/contracts", createContract);
router.patch("/contracts/:id", updateContract);
router.delete("/contracts/:id", deleteContract);

export default router;
