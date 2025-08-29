import { ContractForm } from '@/components/contract/ContractForm';
import { BaseModal } from '@/components/core/BaseModal';
import { useSubmit } from '@/hooks/useSubmit';
import { invoiceApi } from '@/services/api/invoice';
import { InvoiceFormData } from '@/types/invoice';
import { CreateContractSchema } from '@shared/schemas/createContract';
import React from 'react';

export interface EditContractModalProps {
  visible: boolean;
  contractData?: CreateContractSchema;
  onClose: () => void;
}

export const EditContractModal: React.FC<EditContractModalProps> = ({
  visible,
  contractData,
  onClose,
}) => {
  const initialData: CreateContractSchema = {
    ...contractData,
  };

  const { submit, isSubmitting } = useSubmit({
    apiFunc: invoiceApi.updateInvoice,
    successMessage: '更新合約費用成功',
    successRedirectPath: '/(tabs)/invoice',
  });

  const handleSave = async (data: InvoiceFormData) => {
    await submit(contractData.id, data);
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="編輯合約費用">
      <ContractForm
        initialData={initialData}
        onClose={onClose}
        onSave={handleSave}
        isSubmitting={isSubmitting}
      />
    </BaseModal>
  );
};
