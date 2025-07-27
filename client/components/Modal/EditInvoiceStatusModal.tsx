import { BaseModal } from '@/components/core/BaseModal';
import { DatePickerInput } from '@/components/core/DatePickerInput';
import { Heading } from '@/components/core/Heading';
import { InvoiceFormData } from '@/types/invoice';
import { CreateInvoiceSchema } from '@shared/schemas/createInvoice';
import React from 'react';
import { Controller } from 'react-hook-form';

export interface EditInvoiceModalProps {
  visible: boolean;
  invoice: CreateInvoiceSchema;
  onClose: () => void;
  onSave: (data: InvoiceFormData) => void;
}

export const EditInvoiceStatusModal: React.FC<EditInvoiceModalProps> = ({
  visible,
  invoice,
  onClose,
  onSave,
}) => {
  const initialData: CreateInvoiceSchema = {
    ...invoice,
  };

  const handleSave = (data: InvoiceFormData) => {
    onSave(data);
    onClose();
  };

  const modalTitle = (
    <Heading level={2} style={{ textAlign: 'center' }}>
      編輯發票狀態
    </Heading>
  );

  return (
    <BaseModal visible={visible} onClose={onClose} title={modalTitle}>
      <Controller
        // control={control}
        name="dueDate"
        render={({ field: { onChange, value } }) => (
          <>
            <DatePickerInput
              value={value}
              onChange={onChange}
              label="預付款日"
            />
            {/* {errors.dueDate && (
              <View style={styles.errorText}>
                <Text style={{ color: theme.colors.light.error }}>
                  {errors.dueDate.message}
                </Text>
              </View>
            )} */}
          </>
        )}
      />
      {/* <FormButtonGroup
        onCancel={onCancel}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isSubmitDisabled={!isValid || isSubmitting}
        cancelButtonText={cancelButtonText}
        submitButtonText={submitButtonText}
      /> */}
    </BaseModal>
  );
};
