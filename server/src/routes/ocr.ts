import express from "express";
import { analyzeImage } from "../services/visionService";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const result = await analyzeImage(image);
    res.json(result);
  } catch (error) {
    console.error("Error analyzing image:", error);
    res.status(500).json({ error: "Failed to analyze image" });
  }
});

export default router;
