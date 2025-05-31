import { InvoiceFields } from '@/types/types';
import { useState } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useCloudOCR() {
  const [result, setResult] = useState<InvoiceFields | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runOcr = async (base64Image: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/ocr/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // 將 OCR 結果轉換為 InvoiceFields 格式
      const invoiceData: InvoiceFields = {
        invoiceNumber: data.invoiceNumber || '',
        date: data.date || '',
        amount: data.amount || 0,
        items: data.items || [],
      };

      setResult(invoiceData);
    } catch (e) {
      console.error('OCR API Error:', e);
      setError(e instanceof Error ? e.message : 'Failed to process image');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, runOcr };
}
