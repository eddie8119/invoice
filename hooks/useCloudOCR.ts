import type { InvoiceFields } from '@/types/types';
import { useState } from 'react';

export function useCloudOCR() {
  const [result, setResult] = useState<InvoiceFields | null>(null);
  const [loading, setLoading] = useState(false);

  const runOcr = async (base64Image: string) => {
    setLoading(true);
    try {
      const res = await fetch('https://your-api.com/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });
      const data = await res.json();
      setResult(data); // 必須為 { invoiceNumber, date, amount }
    } catch (e) {
      console.error('OCR API Error:', e);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, runOcr };
}
