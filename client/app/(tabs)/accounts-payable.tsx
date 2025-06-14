import { InvoiceScreenLayout } from '@/components/screens/InvoiceScreenLayout';
import { mockInvoicesPayable } from '@/constants/dummyData';
import React from 'react';

export default function AccountsPayable() {
  return (
    <InvoiceScreenLayout
      initialInvoices={mockInvoicesPayable}
      detailPageRoute="/accounts-payable-details"
    />
  );
}
