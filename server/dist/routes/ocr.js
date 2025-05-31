"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visionService_1 = require("../services/visionService");
const router = express_1.default.Router();
router.post('/analyze', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }
        const result = await (0, visionService_1.analyzeImage)(image);
        res.json(result);
    }
    catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ error: 'Failed to analyze image' });
    }
});
exports.default = router;
