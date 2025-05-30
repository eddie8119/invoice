import type { InvoiceFields } from '@/types/types';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export const InvoiceForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: InvoiceFields;
  onSubmit: (formData: InvoiceFields) => void;
}) => {
  const [form, setForm] = useState<InvoiceFields>(defaultValues);

  return (
    <View>
      <Text>發票號碼</Text>
      <TextInput
        value={form.invoiceNumber}
        onChangeText={v => setForm({ ...form, invoiceNumber: v })}
      />
      <Text>日期</Text>
      <TextInput
        value={form.date}
        onChangeText={v => setForm({ ...form, date: v })}
      />
      <Text>金額</Text>
      <TextInput
        value={form.amount}
        onChangeText={v => setForm({ ...form, amount: v })}
        keyboardType="numeric"
      />
      <Button title="提交發票" onPress={() => onSubmit(form)} />
    </View>
  );
};
