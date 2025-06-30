import { ButtonText } from '@/components/core/ButtonText';
import { DatePickerInput } from '@/components/core/DatePickerInput';
import { EditableInvoiceItemsTable } from '@/components/invoice/EditableInvoiceItemsTable';
import { theme } from '@/constants/theme';
import { InvoiceItem } from '@/types/invoice';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export interface InvoiceFormData {
  company: string;
  invoiceNumber: string;
  note: string;
  paymentDueDate: string;
  items: InvoiceItem[];
}

export interface InvoiceFormProps {
  initialData?: InvoiceFormData;
  onCancel: () => void;
  onSave: (data: InvoiceFormData) => void;
  submitButtonText?: string;
  cancelButtonText?: string;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialData,
  onCancel,
  onSave,
  submitButtonText = 'Save',
  cancelButtonText = 'Cancel',
}) => {
  // Default empty values if initialData is not provided
  const defaultData: InvoiceFormData = {
    company: '',
    invoiceNumber: '',
    note: '',
    paymentDueDate: '',
    items: [
      {
        id: `new-${Date.now()}`,
        name: '',
        quantity: 1,
        price: 0,
      },
    ],
  };

  const [form, setForm] = useState<InvoiceFormData>(initialData || defaultData);

  const handleChange = (field: keyof InvoiceFormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ) => {
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
      note: form.note ? form.note.trim() : '',
      paymentDueDate: form.paymentDueDate ? form.paymentDueDate.trim() : '',
      items: form.items,
    });
  };

  return (
    <>
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
        placeholder="發票編號"
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

      <View style={styles.buttonRow}>
        <ButtonText
          text={cancelButtonText}
          variant="outlined"
          size="small"
          onPress={onCancel}
        />
        <ButtonText
          text={submitButtonText}
          variant="filled"
          size="small"
          onPress={handleSave}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 20,
  },
});
