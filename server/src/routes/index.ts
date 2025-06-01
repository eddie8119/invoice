import express from "express";
import authRoutes from "./auth";
import ocrRoutes from "./ocr";

const app = express();

app.use("/api/ocr", ocrRoutes);
app.use("/api/auth", authRoutes);

export default app;
