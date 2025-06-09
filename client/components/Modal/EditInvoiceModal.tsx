import { theme } from '@/constants/theme';
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
        <View style={styles.modalContainer}>
          <Text style={styles.title}>編輯發票資訊</Text>
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
          <TextInput
            style={styles.input}
            value={form.amount}
            onChangeText={text => handleChange('amount', text)}
            placeholder="金額"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={form.note}
            onChangeText={text => handleChange('note', text)}
            placeholder="備註"
            multiline
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>儲存</Text>
            </TouchableOpacity>
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
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
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
