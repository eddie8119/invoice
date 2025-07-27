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
  const [activeStatusFilter, setActiveStatusFilter] = useState('所有'); // New state for status filter
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
    let invoicesForSelectedMonth = invoices.filter(
      invoice => invoice.createdAt.getMonth() + 1 === Number(selectedMonth)
    );
    if (activeStatusFilter === '所有') {
      setFilteredInvoices(invoicesForSelectedMonth);
    } else if (activeStatusFilter === '已付') {
      setFilteredInvoices(
        invoicesForSelectedMonth.filter(inv => inv.status === 'paid')
      );
    } else if (activeStatusFilter === '未付') {
      setFilteredInvoices(
        invoicesForSelectedMonth.filter(inv => inv.status === 'unpaid')
      );
    } else if (activeStatusFilter === '逾期') {
      setFilteredInvoices(
        invoicesForSelectedMonth.filter(inv => inv.status === 'overdue')
      );
    }
  }, [selectedMonth, activeStatusFilter, invoices]);

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

  const handleInvoicePress = (invoice: Invoice) => {
    router.push(`${detailPageRoute}?id=${invoice.id}` as any);
  };

  const unpaidTotal = invoices
    .filter(inv => inv.status === 'unpaid')
    .reduce((sum, inv) => sum + parseFloat(inv.totalAmount), 0)
    .toFixed(2);

  const overdueTotal = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + parseFloat(inv.totalAmount), 0)
    .toFixed(2);

  return {
    invoices,
    filteredInvoices,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    activeStatusFilter,
    handleFilterChange,
    handleStatusToggle,
    handleInvoicePress,
    unpaidTotal,
    overdueTotal,
    isLoading,
  };
}
