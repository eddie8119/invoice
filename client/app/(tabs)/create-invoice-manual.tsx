import { InvoiceForm, InvoiceFormData } from '@/components/invoice/InvoiceForm';
import { theme } from '@/constants/theme';
import { containerStyles } from '@/style/containers';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function CreateInvoiceManual() {
  const handleCancel = () => {
    // Navigate back or to home screen
    router.back();
  };

  const handleSave = (data: InvoiceFormData) => {
    // In a real app, this would save the invoice to the backend
    console.log('Creating invoice:', data);

    // Mock saving and navigate back
    // You could also navigate to the newly created invoice details
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Form section */}
      <View style={containerStyles.lowerSection}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <InvoiceForm
            onCancel={handleCancel}
            onSave={handleSave}
            submitButtonText="創建發票"
            cancelButtonText="取消"
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light.primary,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.light.text,
    textAlign: 'center',
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});
