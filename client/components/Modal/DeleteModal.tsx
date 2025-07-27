import { BaseModal } from '@/components/core/BaseModal';
import { FormButtonGroup } from '@/components/core/FormButtonGroup';
import { Heading } from '@/components/core/Heading';
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

  const modalTitle = (
    <Heading level={2} style={{ textAlign: 'center' }}>
      刪除選取
    </Heading>
  );

  return (
    <BaseModal visible={visible} onClose={onClose} title={modalTitle}>
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
