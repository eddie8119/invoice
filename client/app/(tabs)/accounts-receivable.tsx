import { InvoiceOverviewScreenLayout } from '@/components/layouts/InvoiceOverviewScreenLayout';
import { mockInvoicesReceivable } from '@/constants/dummyData';
import React from 'react';

export default function AccountsReceivable() {
  return (
    <InvoiceOverviewScreenLayout
      detailPageRoute="/accounts-receivable-details"
      invoiceType="receivable"
    />
  );
}
