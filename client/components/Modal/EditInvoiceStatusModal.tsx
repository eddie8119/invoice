import { BaseModal } from '@/components/core/BaseModal';
import { Heading } from '@/components/core/Heading';
import { theme } from '@/constants/theme';
import { InvoiceFormData } from '@/types/invoice';
import { CreateInvoiceSchema } from '@shared/schemas/createInvoice';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export interface EditInvoiceModalProps {
  visible: boolean;
  invoice: CreateInvoiceSchema;
  onClose: () => void;
  onSave: (data: InvoiceFormData) => void;
}

export const EditInvoiceStatusModal: React.FC<EditInvoiceModalProps> = ({
  visible,
  invoice,
  onClose,
  onSave,
}) => {
  const initialData: CreateInvoiceSchema = {
    ...invoice,
  };

  const handleSave = (data: InvoiceFormData) => {
    onSave(data);
    onClose();
  };

  const modalTitle = (
    <Heading level={2} style={styles.pageTitle}>
      編輯發票狀態
    </Heading>
  );

  return (
    <BaseModal visible={visible} onClose={onClose} title={modalTitle}>
      <Text>編輯發票狀態</Text>
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
