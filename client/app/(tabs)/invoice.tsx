import { InvoiceTab } from '@/components/core/tab/InvoiceTab';
import { InvoiceOverviewScreenLayout } from '@/components/layouts/InvoiceOverviewScreenLayout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function Invoice() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(
    (params.type as string) || 'receivable'
  );

  // Update invoiceType based on activeTab
  const invoiceType = activeTab === 'receivable' ? 'receivable' : 'payable';
  const detailPageRoute =
    activeTab === 'receivable'
      ? '/accounts-receivable-details'
      : '/accounts-payable-details';

  // Initialize URL with filter parameter if not present
  useEffect(() => {
    if (!params.type) {
      router.setParams({ type: activeTab });
    }
  }, []);

  return (
    <>
      <InvoiceTab
        active={activeTab}
        onFilterChange={type => {
          setActiveTab(type);
          router.setParams({ type });
        }}
      />
      <InvoiceOverviewScreenLayout
        detailPageRoute={detailPageRoute}
        invoiceType={invoiceType}
      />
    </>
  );
}
