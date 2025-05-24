import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface InvoiceItem {
  name: string;
  amount: number;
  quantity: number;
  totalPrice: number;
}

interface InvoiceData {
  companyName: string;
  date: string;
  items: InvoiceItem[];
  totalAmount: number;
}

export default function ConfirmInvoicePage() {
  const params = useLocalSearchParams();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    if (params.data) {
      try {
        const data = JSON.parse(params.data as string);
        setInvoiceData(data);
      } catch (error) {
        console.error('Error parsing invoice data:', error);
      }
    }
  }, [params.data]);

  const handleConfirm = () => {
    // TODO: Save to database
    if (invoiceData) {
      console.log('Saving invoice:', invoiceData);
      router.push('/invoice-report');
    }
  };

  if (!invoiceData) {
    return (
      <View style={styles.container}>
        <Text>載入中...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>確認發票資訊</Text>
        
        <View style={styles.section}>
          <Text style={styles.label}>公司名稱</Text>
          <Text style={styles.value}>{invoiceData.companyName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>日期</Text>
          <Text style={styles.value}>{invoiceData.date}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>項目</Text>
          {invoiceData.items.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.itemDetails}>
                <Text style={styles.itemText}>
                  單價: ${item.amount}
                </Text>
                <Text style={styles.itemText}>
                  數量: {item.quantity}
                </Text>
                <Text style={styles.itemText}>
                  小計: ${item.totalPrice}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>總計</Text>
          <Text style={styles.totalAmount}>${invoiceData.totalAmount}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>重新掃描</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={handleConfirm}
          >
            <Text style={[styles.buttonText, styles.confirmText]}>確認</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    color: '#000',
  },
  itemCard: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#666',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  confirmText: {
    color: 'white',
  },
});