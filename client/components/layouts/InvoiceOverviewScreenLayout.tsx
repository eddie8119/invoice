import { InvoiceFilter } from '@/components/invoice/InvoiceFilter';
import { InvoiceList } from '@/components/invoice/InvoiceList';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { MounthFilter } from '@/components/invoice/MounthFilter';
import { theme } from '@/constants/theme';
import { containerStyles } from '@/style/containers';
import { InvoiceType } from '@/types/invoice';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface InvoiceOverviewScreenLayoutProps {
  detailPageRoute: string;
  invoiceType: InvoiceType;
}

import { useInvoices } from '@/hooks/useInvoices';

export const InvoiceOverviewScreenLayout = ({
  detailPageRoute,
  invoiceType,
}: InvoiceOverviewScreenLayoutProps) => {
  const {
    filteredInvoices,
    selectedMonth,
    setSelectedMonth,
    unpaidTotal,
    overdueTotal,
    handleFilterChange,
    handleInvoicePress,
    handleStatusToggle,
  } = useInvoices(invoiceType, detailPageRoute);

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
