import { FormButtonGroup } from '@/components/core/FormButtonGroup';
import { Input } from '@/components/core/Input';
import { InvoiceFormData } from '@/types/invoice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@react-navigation/native';
import {
  CreateCashFlowSchema,
  createCashFlowSchema,
} from '@shared/schemas/createCashFlow';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
export interface CashFlowInitProps {
  initialData?: InvoiceFormData;
  onClose?: () => void;
  onSave: (data: InvoiceFormData) => Promise<void>;
  isSubmitting: boolean;
}

export const CashFlowInit: React.FC<CashFlowInitProps> = ({
  initialData,
  onClose,
  onSave,
  isSubmitting,
}) => {
  const { colors } = useTheme();

  // 設定表單與驗證
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    trigger,
  } = useForm<CreateCashFlowSchema>({
    resolver: zodResolver(createCashFlowSchema),
    mode: 'onChange',
    defaultValues: {
      openingBalance: undefined,
    },
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

  const onCancel = () => {
    reset(initialData);
    onClose?.();
  };

  const onSubmit = handleSubmit(onSave);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ gap: 20 }}>
        <Text>請輸入目前公司帳上可動用的現金金額 作為預測起算點</Text>

        <Controller
          control={control}
          name="openingBalance"
          render={({ field: { onChange, value } }) => (
            <Input
              label="開戶金額"
              placeholder="輸入開戶金額"
              value={value}
              onChangeText={onChange}
              error={errors.openingBalance?.message}
            />
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
