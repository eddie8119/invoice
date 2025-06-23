import express from "express";
import authRoutes from "./auth.js";
import ocrRoutes from "./ocr.js";

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/ocr", ocrRoutes);

export default app;
