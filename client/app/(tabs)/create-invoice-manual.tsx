import { InvoiceForm } from '@/components/invoice/InvoiceForm';
import { createContainerStyles } from '@/style/layouts/containers';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function CreateInvoiceManual() {
  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  return (
    <ScrollView
      style={[styles.scrollView, containerStyles.lowerSection]}
      showsVerticalScrollIndicator={false}
    >
      <InvoiceForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
