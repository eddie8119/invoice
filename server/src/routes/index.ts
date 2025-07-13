import express from "express";
import authRoutes from "./auth";
import companyRoutes from "./company";
import invoiceRoutes from "./invoice";
import ocrRoutes from "./ocr";

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/ocr", ocrRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", companyRoutes);

export default app;
