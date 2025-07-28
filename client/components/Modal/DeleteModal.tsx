import { BaseModal } from '@/components/core/BaseModal';
import { FormButtonGroup } from '@/components/core/FormButtonGroup';
import React from 'react';
import { Text } from 'react-native';

export interface DeleteModalProps {
  visible: boolean;
  data: any;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  data,
  isSubmitting,
  onClose,
  onSubmit,
}) => {
  return (
    <BaseModal visible={visible} onClose={onClose} title="刪除選取">
      <Text style={{ textAlign: 'center' }}>
        確定要刪除{data.invoiceNumber}嗎？
      </Text>
      <FormButtonGroup
        onCancel={onClose}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </BaseModal>
  );
};
