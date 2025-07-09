import { InvoiceOverviewScreenLayout } from '@/components/layouts/InvoiceOverviewScreenLayout';
import React from 'react';

export default function AccountsPayable() {
  return (
    <InvoiceOverviewScreenLayout
      detailPageRoute="/accounts-payable-details"
      invoiceType="payable"
    />
  );
}
