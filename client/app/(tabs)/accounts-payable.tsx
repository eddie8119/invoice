import { InvoiceOverviewScreenLayout } from '@/components/layouts/InvoiceOverviewScreenLayout';
import { mockInvoicesPayable } from '@/constants/dummyData';
import React from 'react';

export default function AccountsPayable() {
  return (
    <InvoiceOverviewScreenLayout
      initialInvoices={mockInvoicesPayable}
      detailPageRoute="/accounts-payable-details"
      invoiceType="payable"
    />
  );
}
