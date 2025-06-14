import { BaseModal } from '@/components/core/BaseModal';
import { ButtonText } from '@/components/core/ButtonText';
import { DatePickerInput } from '@/components/core/DatePickerInput';
import { Heading } from '@/components/core/Heading';
import {
  EditableInvoiceItemsTable,
  InvoiceItem,
} from '@/components/invoice/EditableInvoiceItemsTable';
import { theme } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

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
  onSave: (data: {
    company: string;
    invoiceNumber: string;
    note?: string;
    paymentDueDate?: string;
    items: InvoiceItem[];
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
    note: invoice.note || '',
    paymentDueDate: invoice.paymentDueDate || '',
    items: invoice.items || [],
  });

  const handleChange = (field: keyof typeof form, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string) => {
    const newItems = [...form.items];
    const item = { ...newItems[index] };

    if (field === 'quantity' || field === 'price') {
      item[field] = Number(value) || 0;
    } else {
      item[field] = value;
    }

    newItems[index] = item;
    handleChange('items', newItems);
  };

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `new-${Date.now()}`,
      name: '',
      quantity: 1,
      price: 0,
    };
    handleChange('items', [...form.items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = form.items.filter((_, i) => i !== index);
    handleChange('items', newItems);
  };

  const handleSave = () => {
    if (!form.company.trim() || !form.invoiceNumber.trim()) return;
    onSave({
      company: form.company.trim(),
      invoiceNumber: form.invoiceNumber.trim(),
      note: form.note.trim(),
      paymentDueDate: form.paymentDueDate.trim(),
      items: form.items,
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

      <EditableInvoiceItemsTable
        items={form.items}
        onItemChange={handleItemChange}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
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
