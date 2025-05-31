"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeImage = analyzeImage;
const vision_1 = __importDefault(require("@google-cloud/vision"));
const client = new vision_1.default.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});
async function analyzeImage(imageBase64) {
    var _a;
    try {
        const [result] = await client.textDetection({
            image: {
                content: Buffer.from(imageBase64, 'base64')
            }
        });
        return {
            text: ((_a = result.fullTextAnnotation) === null || _a === void 0 ? void 0 : _a.text) || '',
            blocks: result.textAnnotations || []
        };
    }
    catch (error) {
        console.error('Vision API Error:', error);
        throw error;
    }
}
