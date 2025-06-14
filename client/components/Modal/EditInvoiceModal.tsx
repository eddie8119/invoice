import { ButtonText } from '@/components/core/ButtonText';
import { DatePickerInput } from '@/components/core/DatePickerInput';
import { Heading } from '@/components/core/Heading';
import { theme } from '@/constants/theme';
import { containerStyles } from '@/style/containers';
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={containerStyles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Heading level={2} style={styles.pageTitle}>
            編輯發票資訊
          </Heading>
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
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#888',
    lineHeight: 28,
    fontWeight: 'bold',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
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
    marginTop: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.light.divider,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.light.primaryOceanBlue,
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
