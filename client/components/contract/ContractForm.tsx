import { EditableItemsTable } from '@/components/core/EditableItemsTable';
import { FormButtonGroup } from '@/components/core/FormButtonGroup';
import { Input } from '@/components/core/Input';
import { LabelText } from '@/components/core/LabelText';
import { t } from '@/i18n';
import { createFormStyles } from '@/style/layouts/forms';
import { InvoiceFormData } from '@/types/invoice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@react-navigation/native';
import {
  CreateContractSchema,
  createContractSchema,
} from '@shared/schemas/createContract';
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput, View } from 'react-native';

export interface ContractFormProps {
  initialData?: InvoiceFormData;
  onClose?: () => void;
  onSave: (data: InvoiceFormData) => Promise<void>;
  isSubmitting: boolean;
}

export const ContractForm: React.FC<ContractFormProps> = ({
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
  } = useForm<CreateContractSchema>({
    resolver: zodResolver(createContractSchema),
    mode: 'onChange',
    defaultValues: {
      projectName: '',
      contractNumber: '',
      contractAmount: undefined,
      note: '',
    },
  });

  // 使用 useFieldArray 來管理動態表單項目
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'installments',
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
      installmentOrder: undefined,
      percentage: undefined,
      amount: undefined,
      paymentDate: undefined,
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
          name="projectName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="專案名稱"
              placeholder="輸入專案名稱"
              value={value}
              onChangeText={onChange}
              error={errors.projectName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="contractNumber"
          render={({ field: { onChange, value } }) => (
            <Input
              label="專案編號"
              placeholder="輸入專案編號"
              value={value}
              onChangeText={onChange}
              error={errors.contractNumber?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="contractAmount"
          render={({ field: { onChange, value } }) => (
            <Input
              label="合約總金額"
              placeholder="輸入合約總金額"
              value={value?.toString()}
              onChangeText={text => {
                // 允許數字和小數點
                const numericValue = text.replace(/[^0-9.]/g, '');
                // 確保只有一個小數點
                const parts = numericValue.split('.');
                const formattedValue =
                  parts[0] +
                  (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
                // 轉換為數字並更新
                onChange(formattedValue ? Number(formattedValue) : undefined);
              }}
              keyboardType="numeric"
              error={errors.totalContractAmount?.message}
            />
          )}
        />

        {/* 動態表單項目 */}
        <EditableItemsTable
          items={fields}
          onItemChange={(index, field, value) => {
            const currentItem = fields[index];
            let processedValue: string | number | undefined = value;

            if (field === 'installmentOrder' || field === 'percentage') {
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
