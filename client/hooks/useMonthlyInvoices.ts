import { invoiceApi } from '@/services/api/invoice';
import { useEffect, useState } from 'react';

export function useMonthlyInvoices() {
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyInvoices, setMonthlyInvoices] = useState<any[]>([]);
  const [monthsCount, setMonthsCount] = useState<number>(3);

  const fetchMonthlyInvoices = async (monthsCount: number) => {
    setIsLoading(true);
    try {
      const res = await invoiceApi.getInvoicesByMonthRange({ monthsCount });
      if (res.data) {
        setMonthlyInvoices(res.data);
      }
    } catch (error) {
      console.error('Error fetching monthly invoices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 當 monthsCount 變更時，重新獲取數據
  useEffect(() => {
    fetchMonthlyInvoices(monthsCount);
  }, [monthsCount]);

  const handleMonthsCountChange = (count: number) => {
    setMonthsCount(count);
  };

  return {
    monthlyInvoices,
    isLoading,
    monthsCount,
    handleMonthsCountChange,
    refetch: () => fetchMonthlyInvoices(monthsCount),
  };
}
