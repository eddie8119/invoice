import { InvoiceOverviewScreenLayout } from '@/components/layouts/InvoiceOverviewScreenLayout';
import { mockInvoicesReceivable } from '@/constants/dummyData';
import React from 'react';

export default function AccountsReceivable() {
  return (
    <InvoiceOverviewScreenLayout
      initialInvoices={mockInvoicesReceivable}
      detailPageRoute="/accounts-receivable-details"
      invoiceType="receivable"
    />
  );
}
