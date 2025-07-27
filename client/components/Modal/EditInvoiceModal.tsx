import { BaseModal } from '@/components/core/BaseModal';
import { Heading } from '@/components/core/Heading';
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
    note: invoice.note || '',
    dueDate: invoice.dueDate || new Date().toISOString().split('T')[0],
    status: invoice.status,
    type: invoice.type,
    invoiceItems: invoice.invoiceItems || [],
  };

  const { submit, isSubmitting } = useSubmit({
    apiFunc: invoiceApi.updateInvoice,
    successMessage: '更新發票資訊成功',
    successRedirectPath: '/(tabs)/accounts-receivable',
  });

  const handleSave = async (data: InvoiceFormData) => {
    await submit(invoice.id, data);
  };

  const modalTitle = (
    <Heading level={2} style={{ textAlign: 'center' }}>
      編輯發票資訊
    </Heading>
  );

  return (
    <BaseModal visible={visible} onClose={onClose} title={modalTitle}>
      <InvoiceForm
        initialData={initialData}
        onClose={onClose}
        onSave={handleSave}
        isSubmitting={isSubmitting}
      />
    </BaseModal>
  );
};
