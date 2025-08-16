import { CashFlowInit } from '@/components/invoice/CashFlowInit';
import { useSubmit } from '@/hooks/useSubmit';
import { invoiceApi } from '@/services/api/invoice';
import { createContainerStyles } from '@/style/layouts/containers';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function CashFlowInitialize() {
  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  const { submit: handleSave, isSubmitting } = useSubmit({
    apiFunc: invoiceApi.createInvoice,
    successMessage: '新增發票成功',
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
      <CashFlowInit
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
