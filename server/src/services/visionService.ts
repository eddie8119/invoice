import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

export async function analyzeImage(imageBase64: string) {
  try {
    const [result] = await client.textDetection({
      image: {
        content: Buffer.from(imageBase64, 'base64')
      }
    });

    return {
      text: result.fullTextAnnotation?.text || '',
      blocks: result.textAnnotations || []
    };
  } catch (error) {
    console.error('Vision API Error:', error);
    throw error;
  }
}