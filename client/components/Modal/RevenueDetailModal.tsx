import { BaseModal } from '@/components/core/BaseModal';
import { InvoicesChart } from '@/components/core/chart/InvoicesChart';
import React from 'react';

export interface RevenueDetailModalProps {
  visible: boolean;
  onClose: () => void;
  selectedMonthData?: {
    monthName?: string;
    invoices?: any[];
  };
}

export const RevenueDetailModal: React.FC<RevenueDetailModalProps> = ({
  visible,
  onClose,
  selectedMonthData,
}) => {
  const monthName = selectedMonthData?.monthName;
  const invoices = selectedMonthData?.invoices;
  const payableInvoices = invoices?.filter(
    (invoice: any) => invoice.type === 'payable'
  );
  const receivableInvoices = invoices?.filter(
    (invoice: any) => invoice.type === 'receivable'
  );

  return (
    <BaseModal visible={visible} onClose={onClose} title={`${monthName} 發票`}>
      {selectedMonthData?.invoices && (
        <>
          <InvoicesChart
            data={receivableInvoices}
            chartType="receivable"
            chartTitle={`${monthName} 應收發票統計`}
          />
          <InvoicesChart
            data={payableInvoices}
            chartType="payable"
            chartTitle={`${monthName} 應付發票統計`}
          />
        </>
      )}
    </BaseModal>
  );
};
