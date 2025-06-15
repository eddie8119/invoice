import { BaseModal } from '@/components/core/BaseModal';
import { Heading } from '@/components/core/Heading';
import { InvoiceForm, InvoiceFormData } from '@/components/invoice/InvoiceForm';
import { theme } from '@/constants/theme';
import { InvoiceItem } from '@/types/invoice';
import React from 'react';
import { StyleSheet } from 'react-native';

export { InvoiceItem };

export interface EditInvoiceModalProps {
  visible: boolean;
  invoice: {
    company: string;
    invoiceNumber: string;
    note?: string;
    paymentDueDate?: string;
    items: InvoiceItem[];
  };
  onClose: () => void;
  onSave: (data: InvoiceFormData) => void;
}

export const EditInvoiceModal: React.FC<EditInvoiceModalProps> = ({
  visible,
  invoice,
  onClose,
  onSave,
}) => {
  const initialData: InvoiceFormData = {
    company: invoice.company,
    invoiceNumber: invoice.invoiceNumber,
    note: invoice.note || '',
    paymentDueDate: invoice.paymentDueDate || '',
    items: invoice.items || [],
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
    <BaseModal
      visible={visible}
      onClose={onClose}
      title={modalTitle}
    >
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
