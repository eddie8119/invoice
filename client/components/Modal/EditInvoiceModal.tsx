import { BaseModal } from '@/components/core/BaseModal';
import { Heading } from '@/components/core/Heading';
import { InvoiceForm } from '@/components/invoice/InvoiceForm';
import { theme } from '@/constants/theme';
import { InvoiceFormData } from '@/types/invoice';
import { CreateInvoiceSchema } from '@shared/schemas/createInvoice';
import React from 'react';
import { StyleSheet } from 'react-native';

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
    notes: invoice.notes || '',
    dueDate: invoice.dueDate || new Date().toISOString().split('T')[0],
    status: invoice.status || 'unpaid',
    type: invoice.type || 'receivable',
    invoiceItems: invoice.invoiceItems || [],
  };

  const handleSave = (data: InvoiceFormData) => {
    onSave(data);
    onClose();
  };

  const modalTitle = (
    <Heading level={2} style={styles.pageTitle}>
      編輯發票資訊
    </Heading>
  );

  return (
    <BaseModal visible={visible} onClose={onClose} title={modalTitle}>
      <InvoiceForm
        initialData={initialData}
        onCancel={onClose}
        onSave={handleSave}
        submitButtonText="保存"
        cancelButtonText="取消"
      />
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.light.text,
    textAlign: 'center',
  },
});
