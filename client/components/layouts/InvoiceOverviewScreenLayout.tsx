import Loading from '@/components/core/Loading';
import { InvoiceFilter } from '@/components/invoice/InvoiceFilter';
import { InvoiceList } from '@/components/invoice/InvoiceList';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { MounthFilter } from '@/components/invoice/MounthFilter';
import { NoData } from '@/components/sign/NoData';
import { theme } from '@/constants/theme';
import { InvoiceType } from '@/types/invoice';
import React from 'react';
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
    handleInvoicePress,
    handleStatusToggle,
    isLoading,
  } = useInvoices(invoiceType, detailPageRoute);

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: theme.colors.light.primary }}
    >
      <View className="flex-1">
        <InvoiceSummary unpaidTotal={unpaidTotal} overdueTotal={overdueTotal} />
      </View>

      <View className="flex-1">
        <MounthFilter value={selectedMonth} onChange={setSelectedMonth} />
        <InvoiceFilter onFilterChange={handleFilterChange} />
        <View className="flex-1">
          <ScrollView className="flex-1">
            {isLoading ? (
              <Loading />
            ) : invoices.length === 0 ? (
              <NoData />
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
    </View>
  );
};
