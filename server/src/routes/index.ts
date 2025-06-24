import express from "express";
import authRoutes from "./auth";
import ocrRoutes from "./ocr";

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/ocr", ocrRoutes);

export default app;
