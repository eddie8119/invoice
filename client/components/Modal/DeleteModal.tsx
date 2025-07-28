import { BaseModal } from '@/components/core/BaseModal';
import { FormButtonGroup } from '@/components/core/FormButtonGroup';
import React from 'react';
import { Text } from 'react-native';

export interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  data: any;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onDelete,
  data,
}) => {
  const handleSave = () => {
    onDelete();
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="刪除選取">
      <Text style={{ textAlign: 'center' }}>
        確定要刪除{data.invoiceNumber}嗎？
      </Text>
      <FormButtonGroup
        onCancel={onClose}
        onSubmit={handleSave}
        // isSubmitting={isSubmitting}
        // isSubmitDisabled={!isValid || isSubmitting}
      />
    </BaseModal>
  );
};
