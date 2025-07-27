import { BaseModal } from '@/components/core/BaseModal';
import { Heading } from '@/components/core/Heading';
import { InvoiceForm } from '@/components/invoice/InvoiceForm';
import { InvoiceFormData } from '@/types/invoice';
import { CreateInvoiceSchema } from '@shared/schemas/createInvoice';
import React from 'react';

export interface EditInvoiceModalProps {
  visible: boolean;
  invoice: CreateInvoiceSchema;
  onClose: () => void;
  onSave: (data: InvoiceFormData) => void;
}

export const EditInvoiceModal: React.FC<EditInvoiceModalProps> = ({
  visible,
  invoice,
  onClose,
  onSave,
}) => {
  const initialData: CreateInvoiceSchema = {
    ...invoice,
    note: invoice.note || '',
    dueDate: invoice.dueDate || new Date().toISOString().split('T')[0],
    status: invoice.status,
    type: invoice.type,
    invoiceItems: invoice.invoiceItems || [],
  };

  const handleSave = (data: InvoiceFormData) => {
    onSave(data);
    onClose();
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
        onCancel={onClose}
        onSave={handleSave}
      />
    </BaseModal>
  );
};
