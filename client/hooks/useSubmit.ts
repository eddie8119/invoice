import { t } from '@/i18n';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

interface UseSubmitProps {
  apiFunc: (...args: any[]) => Promise<any>;
  successMessage: string;
  successRedirectPath?: string;
}

export const useSubmit = ({
  apiFunc,
  successMessage,
  successRedirectPath,
}: UseSubmitProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (...args: any[]) => {
    setIsSubmitting(true);
    try {
      let response = await apiFunc(...args);

      if (
        response &&
        response.data &&
        typeof response.data.success !== 'undefined'
      ) {
        response = response.data;
      }

      const { success, message } = response;

      if (success) {
        Alert.alert('成功', successMessage);
        if (successRedirectPath) {
          router.push(successRedirectPath as any);
        }
      } else {
        Alert.alert('失敗', message || '發生錯誤');
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
