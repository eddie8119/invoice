import express from "express";
import authRoutes from "./auth";
import invoiceRoutes from "./invoice";
import ocrRoutes from "./ocr";

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/ocr", ocrRoutes);
app.use("/api", invoiceRoutes);

export default app;
