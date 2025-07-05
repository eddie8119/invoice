import { ButtonText } from '@/components/core/ButtonText';
import { DatePickerInput } from '@/components/core/DatePickerInput';
import { Input } from '@/components/core/Input';
import { EditableInvoiceItemsTable } from '@/components/invoice/EditableInvoiceItemsTable';
import { theme } from '@/constants/theme';
import { InvoiceFormData, InvoiceStatus, InvoiceType } from '@/types/invoice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import {
  CreateInvoiceSchema,
  createInvoiceSchema,
} from '@shared/schemas/createInvoice';
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

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
  // 設定表單與驗證
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm<CreateInvoiceSchema>({
    resolver: zodResolver(createInvoiceSchema),
    mode: 'onChange',
    defaultValues: {
      company: '',
      invoiceNumber: '',
      note: '',
      paymentDueDate: '',
      type: 'receivable' as InvoiceType,
      status: 'unpaid' as InvoiceStatus,
      items: [
        {
          id: `new-${Date.now()}`,
          title: '',
          quantity: 0,
          unitPrice: 0,
        },
      ],
    },
  });

  // 使用 useFieldArray 來管理動態表單項目
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // 當有 initialData 時，重設表單值
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        // 確保 items 有 id 屬性
        items: initialData.items.map(item => ({
          ...item,
          id: item.id || `item-${Date.now()}-${Math.random()}`,
        })),
      });
    }
  }, [initialData, reset]);

  const handleAddItem = () => {
    append({
      id: `new-${Date.now()}`,
      title: '',
      quantity: 0,
      unitPrice: 0,
    });
  };

  const onSubmit = handleSubmit(data => {
    onSave(data);
  });

  return (
    <View>
      <ScrollView>
        <Controller
          control={control}
          name="company"
          render={({ field: { onChange, value } }) => (
            <Input
              label="公司名稱"
              placeholder="輸入公司名稱"
              value={value}
              onChangeText={onChange}
              error={errors.company?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="invoiceNumber"
          render={({ field: { onChange, value } }) => (
            <Input
              label="發票編號"
              placeholder="輸入發票編號"
              value={value}
              onChangeText={onChange}
              error={errors.invoiceNumber?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="未付款" value="unpaid" />
                <Picker.Item label="已付款" value="paid" />
                <Picker.Item label="已逾期" value="overdue" />
              </Picker>
              {errors.status && (
                <View style={styles.errorText}>{errors.status.message}</View>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="應收" value="receivable" />
                <Picker.Item label="應付" value="payable" />
              </Picker>
              {errors.type && (
                <View style={styles.errorText}>{errors.type.message}</View>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="paymentDueDate"
          render={({ field: { onChange, value } }) => (
            <>
              <DatePickerInput
                value={value}
                onChange={onChange}
                label="預付款日"
              />
              {errors.paymentDueDate && (
                <View style={styles.errorText}>
                  <Text style={{ color: theme.colors.light.error }}>
                    {errors.paymentDueDate.message}
                  </Text>
                </View>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="note"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>備註</Text>
              <TextInput
                style={styles.textarea}
                placeholder="輸入備註"
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {errors.note && (
                <Text style={styles.errorText}>{errors.note.message}</Text>
              )}
            </View>
          )}
        />

        {/* 動態表單項目 */}
        <EditableInvoiceItemsTable
          items={fields}
          onItemChange={(index, field, value) => {
            // 根據欄位類型轉換值
            const processedValue =
              field === 'quantity' || field === 'unitPrice'
                ? Number(value) || 0
                : value;

            setValue(`items.${index}.${field}`, processedValue);
          }}
          onAddItem={handleAddItem}
          onRemoveItem={remove}
        />
      </ScrollView>
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
          disabled={!isValid}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: theme.colors.light.text,
  },
  inputContainer: {
    marginBottom: 16,
  },
  textarea: {
    height: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.light.divider,
    borderRadius: 4,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.light.divider,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: theme.colors.light.primaryGreenWhite,
  },
  picker: {
    height: 50,
    width: '100%',
    color: theme.colors.light.text,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  errorText: {
    color: theme.colors.light.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
  },
});
