import CustomDropdown from '@/components/core/CustomDropdown';
import { DatePickerInput } from '@/components/core/DatePickerInput';
import { FormButtonGroup } from '@/components/core/FormButtonGroup';
import { Input } from '@/components/core/Input';
import { LabelText } from '@/components/core/LabelText';
import { theme } from '@/constants/theme';
import { t } from '@/i18n';
import { createFormStyles } from '@/style/layouts/forms';
import { InvoiceFormData, InvoiceStatus, InvoiceType } from '@/types/invoice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@react-navigation/native';
import {
  CreateInvoiceSchema,
  createInvoiceSchema,
} from '@shared/schemas/createInvoice';
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput, View } from 'react-native';

export interface InvoiceFormProps {
  initialData?: InvoiceFormData;
  onClose?: () => void;
  onSave: (data: InvoiceFormData) => Promise<void>;
  isSubmitting: boolean;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialData,
  onClose,
  onSave,
  isSubmitting,
}) => {
  const { colors } = useTheme();
  const formStyles = createFormStyles(colors);

  // 設定表單與驗證
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    trigger,
  } = useForm<CreateInvoiceSchema>({
    resolver: zodResolver(createInvoiceSchema),
    mode: 'onChange',
    defaultValues: {
      caseName: '',
      company: '',
      invoiceNumber: '',
      totalAmount: undefined,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      type: 'receivable' as InvoiceType,
      status: 'unpaid' as InvoiceStatus,
      note: '',
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
      const transformedData = {
        ...initialData,
      };
      reset(transformedData);
      // 在重設後觸發驗證，確保 isValid 狀態更新
      trigger();
    }
  }, [initialData, reset, trigger]);

  const handleAddItem = () => {
    append({
      title: '',
      quantity: undefined,
      unitPrice: undefined,
    });
  };

  const onCancel = () => {
    reset(initialData);
    onClose?.();
  };

  const onSubmit = handleSubmit(onSave);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ gap: 20 }}>
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
          name="totalAmount"
          render={({ field: { onChange, value } }) => (
            <Input
              label="發票總金額"
              placeholder="輸入總金額"
              value={value}
              onChangeText={onChange}
              error={errors.totalAmount?.message}
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
          name="issueDate"
          render={({ field: { onChange, value } }) => (
            <>
              <DatePickerInput
                value={value}
                onChange={onChange}
                label="開立發票日期"
              />
              {errors.issueDate && (
                <View style={formStyles.errorText}>
                  <Text style={{ color: theme.colors.light.error }}>
                    {errors.issueDate.message}
                  </Text>
                </View>
              )}
            </>
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
                label="預計付款日"
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
        {/* <EditableInvoiceItemsTable
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
        /> */}
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
