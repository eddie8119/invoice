import { InvoiceFilter } from '@/components/invoice/InvoiceFilter';
import { InvoiceList } from '@/components/invoice/InvoiceList';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { MounthFilter } from '@/components/invoice/MounthFilter';
import { theme } from '@/constants/theme';
import { containerStyles } from '@/style/containers';
import { Invoice } from '@/types/invoice';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface InvoiceScreenLayoutProps {
  initialInvoices: Invoice[];
  detailPageRoute: string;
  // 如果有其他特定於頁面的標題或配置，可以在這裡添加
  // pageTitle?: string;
}

export const InvoiceScreenLayout = ({
  initialInvoices,
  detailPageRoute,
}: InvoiceScreenLayoutProps) => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [selectedMonth, setSelectedMonth] = useState('6'); // Default to June
  const [activeStatusFilter, setActiveStatusFilter] = useState('所有'); // New state for status filter
  const [filteredInvoices, setFilteredInvoices] = useState(() => {
    return invoices.filter(
      invoice => invoice.createdAt.getMonth() + 1 === Number(selectedMonth)
    );
  });

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

  const handleFilterChange = (filter: string) => {
    setActiveStatusFilter(filter);
  };

  const handleInvoicePress = (invoice: Invoice) => {
    router.push(`${detailPageRoute}?id=${invoice.id}` as any);
  };

  const handleStatusToggle = (invoiceToToggle: Invoice) => {
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
  };

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
};

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
