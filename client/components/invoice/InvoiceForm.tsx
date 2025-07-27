import CustomDropdown from '@/components/core/CustomDropdown';
import { DatePickerInput } from '@/components/core/DatePickerInput';
import { FormButtonGroup } from '@/components/core/FormButtonGroup';
import { Input } from '@/components/core/Input';
import { LabelText } from '@/components/core/LabelText';
import { EditableInvoiceItemsTable } from '@/components/invoice/EditableInvoiceItemsTable';
import { theme } from '@/constants/theme';
import { t } from '@/i18n';
import { invoiceApi } from '@/services/api/invoice';
import { createFormStyles } from '@/style/layouts/forms';
import { InvoiceFormData, InvoiceStatus, InvoiceType } from '@/types/invoice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@react-navigation/native';
import {
  CreateInvoiceSchema,
  createInvoiceSchema,
} from '@shared/schemas/createInvoice';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';

export interface InvoiceFormProps {
  initialData?: InvoiceFormData;
  onCancel?: () => void;
  onSave?: (data: InvoiceFormData) => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialData,
  onCancel,
  onSave,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { colors } = useTheme();
  const formStyles = createFormStyles(colors);

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
      caseName: '',
      company: '',
      invoiceNumber: '',
      dueDate: new Date().toISOString().split('T')[0],
      type: 'receivable' as InvoiceType,
      status: 'unpaid' as InvoiceStatus,
      note: '',
      invoiceItems: [
        {
          title: '',
          quantity: undefined,
          unitPrice: undefined,
        },
      ],
    },
  });

  // 使用 useFieldArray 來管理動態表單項目
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'invoiceItems',
  });

  // 當有 initialData 時，重設表單值
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        // 確保 invoiceItems 有 id 屬性
        invoiceItems: initialData.invoiceItems.map(item => ({
          ...item,
          id: item.id || `item-${Date.now()}-${Math.random()}`,
        })),
      });
    }
  }, [initialData, reset]);

  const handleAddItem = () => {
    append({
      title: '',
      quantity: undefined,
      unitPrice: undefined,
    });
  };

  const onSubmit = handleSubmit(async (data: CreateInvoiceSchema) => {
    try {
      setIsSubmitting(true);

      const {
        data: apiResponseData,
        message,
        success,
      } = await invoiceApi.createInvoice(data);

      if (success && apiResponseData) {
        Alert.alert('成功', '發票建立成功', [
          {
            text: 'OK',
            onPress: () => {
              const { type } = data;
              if (type === 'receivable') {
                router.replace('/accounts-receivable');
              } else {
                router.replace('/accounts-payable');
              }
            },
          },
        ]);

        return;
      }

      Alert.alert('錯誤', message || '建立發票失敗，請稍後再試');
      console.error('Create invoice failed:', message);
    } catch (error) {
      console.error('Create invoice error:', error);
      Alert.alert('系統錯誤', '發生未預期的錯誤，請稍後再試');
    } finally {
      // 無論成功或失敗，都將 loading 狀態設為 false
      setIsSubmitting(false);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ gap: 16 }}>
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
          name="caseName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="專案名稱"
              placeholder="輸入專案名稱"
              value={value}
              onChangeText={onChange}
              error={errors.caseName?.message}
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
            <CustomDropdown
              label="付款狀態"
              options={[
                { label: '未付款', value: 'unpaid' },
                { label: '已付款', value: 'paid' },
                { label: '已逾期', value: 'overdue' },
              ]}
              selectedValue={value}
              onValueChange={onChange}
              error={errors.status?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <CustomDropdown
              label="發票類型"
              options={[
                { label: '應收', value: 'receivable' },
                { label: '應付', value: 'payable' },
              ]}
              selectedValue={value}
              onValueChange={onChange}
              error={errors.type?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange, value } }) => (
            <>
              <DatePickerInput
                value={value}
                onChange={onChange}
                label="預付款日"
              />
              {errors.dueDate && (
                <View style={formStyles.errorText}>
                  <Text style={{ color: theme.colors.light.error }}>
                    {errors.dueDate.message}
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
            <View>
              <LabelText label={t('title.note')} />
              <TextInput
                style={formStyles.textarea}
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="輸入備註"
              />
              {errors.note && (
                <Text style={formStyles.errorText}>{errors.note.message}</Text>
              )}
            </View>
          )}
        />

        {/* 動態表單項目 */}
        <EditableInvoiceItemsTable
          items={fields}
          onItemChange={(index, field, value) => {
            const currentItem = fields[index];
            let processedValue: string | number | undefined = value;

            if (field === 'quantity' || field === 'unitPrice') {
              const num = parseFloat(value);
              // Use undefined for empty/invalid to trigger 'required' validation
              processedValue = isNaN(num) ? undefined : num;
            }

            const updatedItem = {
              ...currentItem,
              [field]: processedValue,
            };

            update(index, updatedItem);
          }}
          onAddItem={handleAddItem}
          onRemoveItem={remove}
        />
      </ScrollView>

      <FormButtonGroup
        onCancel={onCancel}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isSubmitDisabled={!isValid || isSubmitting}
      />
    </View>
  );
};
