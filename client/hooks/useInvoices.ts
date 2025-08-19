import { FilterOption } from '@/components/core/filter/Filter';
import { invoiceApi } from '@/services/api/invoice';
import { Invoice, InvoiceType } from '@/types/invoice';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export function useInvoices(invoiceType: InvoiceType, detailPageRoute: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    (new Date().getMonth() + 1).toString()
  );
  const [activeStatusFilter, setActiveStatusFilter] = useState('所有'); // 付款狀態過濾
  const [activeInvoiceNumberFilter, setActiveInvoiceNumberFilter] =
    useState<FilterOption>('所有'); // 發票號碼過濾
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);

  const fetchInvoices = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await invoiceApi.getInvoices({
        type: invoiceType,
        month: selectedMonth,
        year: selectedYear,
      });
      if (res.success && res.data) {
        const transformedInvoices = res.data.map((item: any) => ({
          id: item.id,
          invoiceNumber: item.invoiceNumber,
          company: item.company.name,
          totalAmount: item.totalAmount.toString(),
          createdAt: new Date(item.createdAt),
          dueDate: item.dueDate ? new Date(item.dueDate) : null,
          paidAt: item.paidAt ? new Date(item.paidAt) : null,
          status: item.status,
        }));
        setInvoices(transformedInvoices);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, selectedYear, invoiceType]);

  useFocusEffect(
    useCallback(() => {
      fetchInvoices();
    }, [fetchInvoices])
  );

  // 過濾邏輯
  useEffect(() => {
    // 先按月份過濾
    let filteredByMonth = invoices.filter(
      invoice => invoice.createdAt.getMonth() + 1 === Number(selectedMonth)
    );

    // 按付款狀態過濾
    let filteredByStatus = filteredByMonth;
    if (activeStatusFilter !== '所有') {
      if (activeStatusFilter === '已付') {
        filteredByStatus = filteredByMonth.filter(inv => inv.status === 'paid');
      } else if (activeStatusFilter === '未付') {
        filteredByStatus = filteredByMonth.filter(
          inv => inv.status === 'unpaid'
        );
      } else if (activeStatusFilter === '逾期') {
        filteredByStatus = filteredByMonth.filter(
          inv => inv.status === 'overdue'
        );
      }
    }

    // 按發票號碼過濾
    let finalFiltered = filteredByStatus;
    if (activeInvoiceNumberFilter !== '所有') {
      if (activeInvoiceNumberFilter === '已開立') {
        // 篩選有發票號碼的發票（非空字符串）
        finalFiltered = filteredByStatus.filter(
          inv => inv.invoiceNumber && inv.invoiceNumber.trim() !== ''
        );
      } else if (activeInvoiceNumberFilter === '未開立') {
        // 篩選沒有發票號碼的發票（空字符串或null或undefined）
        finalFiltered = filteredByStatus.filter(
          inv => !inv.invoiceNumber || inv.invoiceNumber.trim() === ''
        );
      }
    }

    setFilteredInvoices(finalFiltered);
  }, [selectedMonth, activeStatusFilter, activeInvoiceNumberFilter, invoices]);

  const handleStatusToggle = useCallback((invoiceToToggle: Invoice) => {
    setInvoices(prevInvoices =>
      prevInvoices.map(inv => {
        if (inv.id === invoiceToToggle.id) {
          const newStatus = inv.status === 'paid' ? 'unpaid' : 'paid';
          return {
            ...inv,
            status: newStatus,
            paidAt: newStatus === 'paid' ? new Date() : null,
          } as Invoice;
        }
        return inv;
      })
    );
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveStatusFilter(filter);
  };

  const handleInvoiceNumberFilterChange = (filter: FilterOption) => {
    setActiveInvoiceNumberFilter(filter);
  };

  const handleInvoicePress = (invoice: Invoice) => {
    router.push(`${detailPageRoute}?id=${invoice.id}` as any);
  };

  const unpaidTotal = invoices
    .filter(inv => inv.status === 'unpaid')
    .reduce((sum, inv) => sum + parseFloat(inv.totalAmount), 0);
  const overdueTotal = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + parseFloat(inv.totalAmount), 0);

  return {
    invoices,
    filteredInvoices,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    activeStatusFilter,
    handleFilterChange,
    activeInvoiceNumberFilter,
    handleInvoiceNumberFilterChange,
    handleStatusToggle,
    handleInvoicePress,
    unpaidTotal,
    overdueTotal,
    isLoading,
  };
}
