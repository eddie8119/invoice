import { BaseModal } from '@/components/core/BaseModal';
import { ButtonText } from '@/components/core/ButtonText';
import { DatePickerInput } from '@/components/core/DatePickerInput';
import { Heading } from '@/components/core/Heading';
import { theme } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export interface EditInvoiceModalProps {
  visible: boolean;
  invoice: {
    company: string;
    invoiceNumber: string;
    amount: number;
    note?: string;
    paymentDueDate?: string;
  };
  onClose: () => void;
  onSave: (data: {
    company: string;
    invoiceNumber: string;
    amount: number;
    note?: string;
    paymentDueDate?: string; // Added paymentDueDate
  }) => void;
}

export const EditInvoiceModal: React.FC<EditInvoiceModalProps> = ({
  visible,
  invoice,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState({
    company: invoice.company,
    invoiceNumber: invoice.invoiceNumber,
    amount: String(invoice.amount),
    note: invoice.note || '',
    paymentDueDate: invoice.paymentDueDate || '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (
      !form.company.trim() ||
      !form.invoiceNumber.trim() ||
      isNaN(Number(form.amount))
    )
      return;
    onSave({
      company: form.company.trim(),
      invoiceNumber: form.invoiceNumber.trim(),
      amount: Number(form.amount),
      note: form.note.trim(),
      paymentDueDate: form.paymentDueDate.trim(),
    });
    onClose();
  };

  const modalTitle = (
    <Heading level={2} style={styles.pageTitle}>
      編輯發票資訊
    </Heading>
  );

  const modalFooter = (
    <View style={styles.buttonRow}>
      <ButtonText
        text="Cancel"
        variant="outlined"
        size="small"
        onPress={onClose}
      />
      <ButtonText
        text="Save"
        variant="filled"
        size="small"
        onPress={handleSave}
      />
    </View>
  );

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title={modalTitle}
      footer={modalFooter}
    >
      <TextInput
        style={styles.input}
        value={form.company}
        onChangeText={text => handleChange('company', text)}
        placeholder="公司名稱"
      />
      <TextInput
        style={styles.input}
        value={form.invoiceNumber}
        onChangeText={text => handleChange('invoiceNumber', text)}
        placeholder="發票號碼"
      />
      <DatePickerInput
        value={form.paymentDueDate}
        onChange={date => handleChange('paymentDueDate', date)}
        label="預付款日"
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={form.note}
        onChangeText={text => handleChange('note', text)}
        placeholder="備註"
        multiline
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
  input: {
    borderWidth: 1,
    borderColor: theme.colors.light.divider,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    color: theme.colors.light.text,
    backgroundColor: theme.colors.light.primaryGreenWhite,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 12, // This will be handled by BaseModal's footerContainer style if needed
  },
  // Unused styles (cancelButton, saveButton, buttonText) can be removed if ButtonText handles its own styling
});
