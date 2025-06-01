import express from "express";
import { login, logout, register } from "../controllers/auth";
import { validateAuth } from "../middleware/validateAuth";

const router = express.Router();

// 註冊
router.post("/register", validateAuth, register);

// 登入
router.post("/login", validateAuth, login);

// 登出
router.post("/logout", logout);

export default router;
