import { invoiceApi } from '@/services/api/invoice';
import { useEffect, useState } from 'react';

export function useMonthlyBalance() {
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyBalance, setMonthlyBalance] = useState<any[]>([]);
  const [monthsCount, setMonthsCount] = useState<number>(3);

  const fetchMonthlyBalance = async (monthsCount: number) => {
    setIsLoading(true);
    try {
      const res = await invoiceApi.getBalanceByMonthRange({ monthsCount });
      if (res.data) {
        setMonthlyBalance(res.data);
      }
    } catch (error) {
      console.error('Error fetching monthly balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 當 monthsCount 變更時，重新獲取數據
  useEffect(() => {
    fetchMonthlyBalance(monthsCount);
  }, [monthsCount]);

  const handleMonthsCountChange = (count: number) => {
    setMonthsCount(count);
  };

  return {
    monthlyBalance,
    isLoading,
    monthsCount,
    handleMonthsCountChange,
    refetch: () => fetchMonthlyBalance(monthsCount),
  };
}
