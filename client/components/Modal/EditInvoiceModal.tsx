import { BaseModal } from '@/components/core/BaseModal';
import { InvoiceForm } from '@/components/invoice/InvoiceForm';
import { useSubmit } from '@/hooks/useSubmit';
import { invoiceApi } from '@/services/api/invoice';
import { InvoiceFormData } from '@/types/invoice';
import { CreateInvoiceSchema } from '@shared/schemas/createInvoice';
import React from 'react';

export interface EditInvoiceModalProps {
  visible: boolean;
  invoice: CreateInvoiceSchema;
  onClose: () => void;
}

export const EditInvoiceModal: React.FC<EditInvoiceModalProps> = ({
  visible,
  invoice,
  onClose,
}) => {
  const initialData: CreateInvoiceSchema = {
    ...invoice,
    caseName: invoice.case.name || '',
    note: invoice.note || '',
    dueDate: invoice.dueDate || new Date().toISOString().split('T')[0],
    status: invoice.status,
    type: invoice.type,
    invoiceItems: invoice.items || [],
  };

  const { submit, isSubmitting } = useSubmit({
    apiFunc: invoiceApi.updateInvoice,
    successMessage: '更新發票資訊成功',
    successRedirectPath: '/(tabs)/invoice',
  });

  const handleSave = async (data: InvoiceFormData) => {
    await submit(invoice.id, data);
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="編輯發票資訊">
      <InvoiceForm
        initialData={initialData}
        onClose={onClose}
        onSave={handleSave}
        isSubmitting={isSubmitting}
      />
    </BaseModal>
  );
};
