import { InvoiceTab } from '@/components/core/tab/InvoiceTab';
import { InvoiceOverviewScreenLayout } from '@/components/layouts/InvoiceOverviewScreenLayout';
import React from 'react';

export default function Invoice() {
  return (
    <>
      <InvoiceTab active="應收帳款" onFilterChange={() => {}} />
      <InvoiceOverviewScreenLayout
        detailPageRoute="/accounts-receivable-details"
        invoiceType="receivable"
      />
    </>
  );
}
