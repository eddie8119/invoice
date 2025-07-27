import { InvoiceForm } from '@/components/invoice/InvoiceForm';
import { useSubmit } from '@/hooks/useSubmit';
import { t } from '@/i18n';
import { invoiceApi } from '@/services/api/invoice';
import { createContainerStyles } from '@/style/layouts/containers';
import { InvoiceFormData } from '@/types/invoice';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function CreateInvoiceManual() {
  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  const { submit: handleSave, isSubmitting } = useSubmit<InvoiceFormData>({
    apiFunc: invoiceApi.createInvoice,
    successMessage: t('invoice.createSuccess'),
    successRedirectPath: '/(tabs)/accounts-receivable',
  });

  const handleCancel = () => {
    router.back();
  };

  return (
    <ScrollView
      style={[styles.scrollView, containerStyles.lowerSection]}
      showsVerticalScrollIndicator={false}
    >
      <InvoiceForm
        onClose={handleCancel}
        onSave={handleSave}
        isSubmitting={isSubmitting}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
