import { ButtonText } from '@/components/core/ButtonText';
import type { InvoiceFields } from '@/types/types';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function InvoiceForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: InvoiceFields;
  onSubmit: (formData: InvoiceFields) => void;
}) {
  const [form, setForm] = useState<InvoiceFields>(defaultValues);

  return (
    <View>
      <Text>發票編號</Text>
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
        value={form.totalAmount}
        onChangeText={v => setForm({ ...form, totalAmount: v })}
        keyboardType="numeric"
      />
      <ButtonText text="提交發票" onPress={() => onSubmit(form)} />
    </View>
  );
}
