// client/hooks/useMonthlyTotals.ts
import { invoiceApi } from '@/services/api/invoice';
import { InvoiceType } from '@/types/invoice';
import { useEffect, useState } from 'react';

export function useMonthlyTotals(invoiceType: InvoiceType) {
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyTotals, setMonthlyTotals] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<InvoiceType>(invoiceType);
  const [monthsCount, setMonthsCount] = useState<number>(3);

  const fetchMonthlyTotals = async (type: InvoiceType, monthsCount: number) => {
    setIsLoading(true);
    try {
      const res = await invoiceApi.getMonthlyTotals({ type, monthsCount });
      if (res.data) {
        setMonthlyTotals(res.data);
      }
    } catch (error) {
      console.error('Error fetching monthly totals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 當外部傳入的 invoiceType 變更時，更新內部的 activeFilter
  useEffect(() => {
    setActiveFilter(invoiceType);
  }, [invoiceType]);

  // 當 activeFilter 或 monthsCount 變更時，重新獲取數據
  useEffect(() => {
    fetchMonthlyTotals(activeFilter, monthsCount);
  }, [activeFilter, monthsCount]);

  const handleFilterChange = (filter: InvoiceType) => {
    setActiveFilter(filter);
  };

  const handleMonthsCountChange = (count: number) => {
    setMonthsCount(count);
  };

  return {
    monthlyTotals,
    isLoading,
    activeFilter,
    monthsCount,
    handleFilterChange,
    handleMonthsCountChange,
    refetch: () => fetchMonthlyTotals(activeFilter, monthsCount),
  };
}
