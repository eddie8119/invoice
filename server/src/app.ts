import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ocrRoutes from './routes/ocr';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 路由
app.use('/api/ocr', ocrRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});