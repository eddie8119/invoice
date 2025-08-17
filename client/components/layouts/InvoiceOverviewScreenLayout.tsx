import Loading from '@/components/core/Loading';
import { InvoiceFilter } from '@/components/invoice/InvoiceFilter';
import { InvoiceList } from '@/components/invoice/InvoiceList';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { MounthFilter } from '@/components/invoice/MounthFilter';
import { NoInvoiceNumberFilter } from '@/components/invoice/NoInvoiceNumberFilter';
import { NoData } from '@/components/sign/NoData';
import { createContainerStyles } from '@/style/layouts/containers';
import { InvoiceType } from '@/types/invoice';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

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
    invoices,
    filteredInvoices,
    selectedMonth,
    setSelectedMonth,
    unpaidTotal,
    overdueTotal,
    handleFilterChange,
    activeInvoiceNumberFilter,
    handleInvoiceNumberFilterChange,
    handleInvoicePress,
    handleStatusToggle,
    isLoading,
  } = useInvoices(invoiceType, detailPageRoute);
  const { colors } = useTheme();

  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={containerStyles.upperSection}>
        <InvoiceSummary unpaidTotal={unpaidTotal} overdueTotal={overdueTotal} />
      </View>

      <View style={containerStyles.lowerSection}>
        <MounthFilter value={selectedMonth} onChange={setSelectedMonth} />

        <InvoiceFilter onFilterChange={handleFilterChange} />
        <NoInvoiceNumberFilter 
          active={activeInvoiceNumberFilter}
          onFilterChange={handleInvoiceNumberFilterChange}
        />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {isLoading ? (
            <Loading />
          ) : invoices.length === 0 ? (
            <NoData infoShow="發票" />
          ) : (
            <InvoiceList
              invoices={filteredInvoices}
              onInvoicePress={handleInvoicePress}
              onStatusToggle={handleStatusToggle}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};
