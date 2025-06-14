import { InvoiceFilter } from '@/components/invoice/InvoiceFilter';
import { InvoiceList } from '@/components/invoice/InvoiceList';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { MounthFilter } from '@/components/invoice/MounthFilter';
import { mockInvoicesReceivable } from '@/constants/dummyData';
import { theme } from '@/constants/theme';
import { containerStyles } from '@/style/containers';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// 定義 Invoice 介面，與 InvoiceList.tsx 中的保持一致
interface Invoice {
  id: string;
  company: string;
  amount: string;
  createdAt: Date;
  paidAt: Date | null;
  expectPaidAt: Date | null;
  status: 'paid' | 'unpaid' | 'overdue';
  invoiceNumber: string;
}

export default function AccountsReceivable() {
  // 使用 useState 來管理 invoices 數據，初始值為 mockInvoicesReceivable
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoicesReceivable as Invoice[]);
  const [selectedMonth, setSelectedMonth] = useState('6'); // Default to June
  const [activeStatusFilter, setActiveStatusFilter] = useState('所有'); // New state for status filter
  const [filteredInvoices, setFilteredInvoices] = useState(() => {
    // Initial filtering logic for setFilteredInvoices
    // Filter by the initial selectedMonth and '所有' status
    return invoices.filter(
      invoice => invoice.createdAt.getMonth() + 1 === Number(selectedMonth)
    );
  });

  // useEffect to update filteredInvoices when selectedMonth or activeStatusFilter changes
  useEffect(() => {
    // 1. Filter by selected month
    let invoicesForSelectedMonth = invoices.filter(
      invoice => invoice.createdAt.getMonth() + 1 === Number(selectedMonth)
    );

    // 2. Filter by status
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
  }, [selectedMonth, activeStatusFilter, invoices]); // 依賴於 invoices 而不是 mockInvoicesReceivable

  // handleFilterChange now only updates the activeStatusFilter state
  const handleFilterChange = (filter: string) => {
    setActiveStatusFilter(filter);
  };

  const handleInvoicePress = (invoice: any) => {
    router.push(`/accounts-receivable-details?id=${invoice.id}`);
  };

  // 處理狀態切換的函數
  const handleStatusToggle = (invoice: Invoice) => {
    setInvoices(prevInvoices => 
      prevInvoices.map(inv => {
        if (inv.id === invoice.id) {
          // 如果是已付，切換為未付；如果是未付或逾期，切換為已付
          const newStatus = inv.status === 'paid' ? 'unpaid' : 'paid';
          return {
            ...inv,
            status: newStatus,
            // 如果切換為已付，設置付款日期為當前日期；否則清除付款日期
            paidAt: newStatus === 'paid' ? new Date() : null
          } as Invoice; // 使用類型斷言確保返回類型正確
        }
        return inv;
      })
    );
  };

  // 計算總額
  const unpaidTotal = invoices
    .filter(inv => inv.status === 'unpaid')
    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0)
    .toFixed(2);

  const overdueTotal = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      <View style={containerStyles.upperSection}>
        <InvoiceSummary unpaidTotal={unpaidTotal} overdueTotal={overdueTotal} />
      </View>

      <View style={containerStyles.lowerSection}>
        <MounthFilter value={selectedMonth} onChange={setSelectedMonth} />
        <InvoiceFilter onFilterChange={handleFilterChange} />
        <View style={styles.listContainer}>
          <ScrollView>
            <InvoiceList
              invoices={filteredInvoices}
              onInvoicePress={handleInvoicePress}
              onStatusToggle={handleStatusToggle}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light.primary,
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});
