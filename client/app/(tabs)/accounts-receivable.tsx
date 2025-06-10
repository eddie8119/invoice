import { InvoiceFilter } from '@/components/invoice/InvoiceFilter';
import { InvoiceList } from '@/components/invoice/InvoiceList';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { MounthFilter } from '@/components/invoice/MounthFilter';
import { theme } from '@/constants/theme';
import { containerStyles } from '@/style/containers';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// 模擬數據
const mockInvoices = [
  {
    id: '1',
    company: '李煥貿易有限公司',
    amount: '582.70',
    createdAt: new Date('2025-06-05'),
    paidAt: null,
    expectPaidAt: null,
    status: 'unpaid' as const,
    invoiceNumber: 'INV100001',
  },
  {
    id: '2',
    company: '環球科技有限公司',
    amount: '582.01',
    createdAt: new Date('2025-06-05'),
    paidAt: null,
    expectPaidAt: null,
    status: 'overdue' as const,
    invoiceNumber: 'INV100002',
  },
  {
    id: '3',
    company: '王華科技有限公司',
    amount: '582.23',
    createdAt: new Date('2025-06-05'),
    paidAt: new Date('2025-06-8'),
    expectPaidAt: null,
    status: 'paid' as const,
    invoiceNumber: 'INV100003',
  },
  {
    id: '4',
    company: '陳小華有限公司',
    amount: '582.70',
    createdAt: new Date('2025-06-04'),
    paidAt: null,
    expectPaidAt: new Date('2025-06-13'),
    status: 'unpaid' as const,
    invoiceNumber: 'INV100004',
  },
];

export default function AccountsReceivable() {
  const [selectedMonth, setSelectedMonth] = useState('6'); // Default to June
  const [activeStatusFilter, setActiveStatusFilter] = useState('所有'); // New state for status filter
  const [filteredInvoices, setFilteredInvoices] = useState(() => {
    // Initial filtering logic for setFilteredInvoices
    // Filter by the initial selectedMonth and '所有' status
    return mockInvoices.filter(
      invoice => invoice.createdAt.getMonth() + 1 === Number(selectedMonth)
    );
  });

  // useEffect to update filteredInvoices when selectedMonth or activeStatusFilter changes
  useEffect(() => {
    // 1. Filter by selected month
    let invoicesForSelectedMonth = mockInvoices.filter(
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
  }, [selectedMonth, activeStatusFilter, mockInvoices]); // mockInvoices is stable but good practice to include if it could change

  // handleFilterChange now only updates the activeStatusFilter state
  const handleFilterChange = (filter: string) => {
    setActiveStatusFilter(filter);
  };

  const handleInvoicePress = (invoice: any) => {
    router.push(`/accounts-receivable-details?id=${invoice.id}`);
  };

  // 計算總額
  const unpaidTotal = mockInvoices
    .filter(inv => inv.status === 'unpaid')
    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0)
    .toFixed(2);

  const overdueTotal = mockInvoices
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
