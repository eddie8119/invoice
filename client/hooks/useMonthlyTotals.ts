// client/hooks/useMonthlyTotals.ts
import { invoiceApi } from '@/services/api/invoice';
import { useEffect, useState } from 'react';

export function useMonthlyTotals() {
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyTotals, setMonthlyTotals] = useState<any[]>([]);
  const [monthsCount, setMonthsCount] = useState<number>(3);

  const fetchMonthlyTotals = async (monthsCount: number) => {
    setIsLoading(true);
    try {
      const res = await invoiceApi.getBalanceByMonthRange({ monthsCount });
      if (res.data) {
        setMonthlyTotals(res.data);
      }
    } catch (error) {
      console.error('Error fetching monthly totals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 當 monthsCount 變更時，重新獲取數據
  useEffect(() => {
    fetchMonthlyTotals(monthsCount);
  }, [monthsCount]);

  const handleMonthsCountChange = (count: number) => {
    setMonthsCount(count);
  };

  return {
    monthlyTotals,
    isLoading,
    monthsCount,
    handleMonthsCountChange,
    refetch: () => fetchMonthlyTotals(monthsCount),
  };
}
