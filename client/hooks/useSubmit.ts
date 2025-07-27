import { t } from '@/i18n';
import { InvoiceFormData } from '@/types/invoice';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

interface UseSubmitProps<T> {
  apiFunc: (data: T) => Promise<any>;
  successMessage: string;
  successRedirectPath?: string;
  onSuccess?: () => void;
}

export const useSubmit = <T>({
  apiFunc,
  successMessage,
  successRedirectPath,
  onSuccess,
}: UseSubmitProps<T>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (data: T) => {
    setIsSubmitting(true);
    try {
      let response = await apiFunc(data);

      // Handle cases where the API function returns a raw Axios response
      if (
        response &&
        response.data &&
        typeof response.data.success !== 'undefined'
      ) {
        response = response.data;
      }

      const { success, message } = response;

      if (success) {
        Alert.alert(t('alert.successTitle'), successMessage);
        onSuccess?.();
        if (successRedirectPath) {
          router.push(successRedirectPath as any);
        }
      } else {
        Alert.alert(t('alert.errorTitle'), message || t('alert.defaultError'));
      }
    } catch (error) {
      console.error('Submit invoice error:', error);
      Alert.alert(t('alert.systemErrorTitle'), t('alert.systemError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting };
};
