import { InvoiceFilter } from '@/components/invoice/InvoiceFilter';
import { InvoiceList } from '@/components/invoice/InvoiceList';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// 模擬數據
const mockInvoices = [
  {
    id: '1',
    company: '李煥貿易有限公司',
    amount: '582.70',
    date: '12/22/2020',
    status: 'unpaid' as const,
    invoiceNumber: 'INV100001',
  },
  {
    id: '2',
    company: '環球科技有限公司',
    amount: '582.01',
    date: '12/22/2020',
    status: 'overdue' as const,
    invoiceNumber: 'INV100002',
  },
  {
    id: '3',
    company: '王華科技有限公司',
    amount: '582.23',
    date: '12/23/2020',
    status: 'paid' as const,
    invoiceNumber: 'INV100003',
  },
];

export default function Invoice() {
  const [filteredInvoices, setFilteredInvoices] = useState(mockInvoices);

  const handleFilterChange = (filter: string) => {
    if (filter === '所有') {
      setFilteredInvoices(mockInvoices);
    } else if (filter === '已付') {
      setFilteredInvoices(mockInvoices.filter(inv => inv.status === 'paid'));
    } else if (filter === '未付') {
      setFilteredInvoices(mockInvoices.filter(inv => inv.status === 'unpaid'));
    } else if (filter === '逾期') {
      setFilteredInvoices(mockInvoices.filter(inv => inv.status === 'overdue'));
    }
  };

  const handleInvoicePress = (invoice: any) => {
    console.log('Invoice pressed:', invoice);
    // 導航到發票詳情頁面
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
      <ScrollView style={styles.scrollView}>
        <InvoiceSummary unpaidTotal={unpaidTotal} overdueTotal={overdueTotal} />

        <InvoiceFilter onFilterChange={handleFilterChange} />

        <InvoiceList
          invoices={filteredInvoices}
          onInvoicePress={handleInvoicePress}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollView: {
    flex: 1,
  },
});
