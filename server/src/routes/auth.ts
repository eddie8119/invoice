import {
  checkUserExists,
  deleteUser,
  getCurrentUser,
  login,
  logout,
  register,
  updateUser,
} from "@/controllers/auth";
import { validateAuth } from "@/middleware/validateAuth";
import express from "express";

const router = express.Router();

router.post("/register", validateAuth, register);
router.post("/login", validateAuth, login);
router.post("/logout", logout);
router.get("/me", getCurrentUser);
router.put("/user/:documentId", validateAuth, updateUser);
router.delete("/user/:documentId", validateAuth, deleteUser);
router.get("/check/:email", validateAuth, checkUserExists);

export default router;
