import { ContractForm } from '@/components/contract/ContractForm';
import { BaseModal } from '@/components/core/BaseModal';
import { useSubmit } from '@/hooks/useSubmit';
import { contractApi } from '@/services/api/contract';
import { CreateContractSchema } from '@shared/schemas/createContract';
import React from 'react';

export interface EditContractModalProps {
  type: 'create' | 'edit';
  visible: boolean;
  contractData?: CreateContractSchema;
  onClose: () => void;
}

export const EditContractModal: React.FC<EditContractModalProps> = ({
  type,
  visible,
  contractData,
  onClose,
}) => {
  const initialData: CreateContractSchema = {
    ...contractData,
  };

  const isCreate = type === 'create';

  const { submit, isSubmitting } = useSubmit({
    apiFunc: isCreate ? contractApi.createContract : contractApi.updateContract,
    successMessage: '更新合約費用成功',
    successRedirectPath: '/(tabs)/invoice',
  });

  const handleSave = async (data: any) => {
    if (isCreate) {
      await submit(data);
    } else {
      await submit(contractData.id, data);
    }
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title={isCreate ? '建立合約費用' : '編輯合約費用'}
    >
      <ContractForm
        initialData={initialData}
        onClose={onClose}
        onSave={handleSave}
        isSubmitting={isSubmitting}
      />
    </BaseModal>
  );
};
