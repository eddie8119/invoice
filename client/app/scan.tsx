import { InvoiceConfirmationDialog } from '@/components/InvoiceConfirmationDialog';
import { InvoiceScanner } from '@/components/InvoiceScanner';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface InvoiceData {
  companyName: string;
  date: string;
  items: {
    name: string;
    totalAmount: number;
    quantity: number;
    totalPrice: number;
  }[];
  totalAmount: number;
}

export default function ScannScreen() {
  const [scannedData, setScannedData] = useState<InvoiceData | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleScanComplete = (data: InvoiceData) => {
    setScannedData(data);
    setShowConfirmation(true);
  };

  const handleConfirm = async (confirmedData: InvoiceData) => {
    // TODO: Save to database
    console.log('Confirmed data:', confirmedData);
    setShowConfirmation(false);
    setScannedData(null);
    // Navigate back to the main screen or list
    router.back();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setScannedData(null);
  };

  return (
    <View style={styles.container}>
      <InvoiceScanner onScanComplete={handleScanComplete} />
      {scannedData && (
        <InvoiceConfirmationDialog
          visible={showConfirmation}
          data={scannedData}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
