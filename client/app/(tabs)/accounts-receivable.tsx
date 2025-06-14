import { InvoiceScreenLayout } from '@/components/screens/InvoiceScreenLayout';
import { mockInvoicesReceivable } from '@/constants/dummyData';
import React from 'react';

export default function AccountsReceivable() {
  return (
    <InvoiceScreenLayout
      initialInvoices={mockInvoicesReceivable}
      detailPageRoute="/accounts-receivable-details"
    />
  );
}
