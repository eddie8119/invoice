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

export default function AccountsReceivable() {
  const [selectedMonth, setSelectedMonth] = useState('6'); // Default to June
  const [activeStatusFilter, setActiveStatusFilter] = useState('所有'); // New state for status filter
  const [filteredInvoices, setFilteredInvoices] = useState(() => {
    // Initial filtering logic for setFilteredInvoices
    // Filter by the initial selectedMonth and '所有' status
    return mockInvoicesReceivable.filter(
      invoice => invoice.createdAt.getMonth() + 1 === Number(selectedMonth)
    );
  });

  // useEffect to update filteredInvoices when selectedMonth or activeStatusFilter changes
  useEffect(() => {
    // 1. Filter by selected month
    let invoicesForSelectedMonth = mockInvoicesReceivable.filter(
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
  }, [selectedMonth, activeStatusFilter, mockInvoicesReceivable]); // mockInvoicesReceivable is stable but good practice to include if it could change

  // handleFilterChange now only updates the activeStatusFilter state
  const handleFilterChange = (filter: string) => {
    setActiveStatusFilter(filter);
  };

  const handleInvoicePress = (invoice: any) => {
    router.push(`/accounts-receivable-details?id=${invoice.id}`);
  };

  // 計算總額
  const unpaidTotal = mockInvoicesReceivable
    .filter(inv => inv.status === 'unpaid')
    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0)
    .toFixed(2);

  const overdueTotal = mockInvoicesReceivable
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
