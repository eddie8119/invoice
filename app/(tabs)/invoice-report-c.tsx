import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface InvoiceItem {
  name: string;
  amount: number;
  quantity: number;
  totalPrice: number;
}

interface Invoice {
  id: string;
  companyName: string;
  date: string;
  items: InvoiceItem[];
  totalAmount: number;
  paid: boolean;
}

export default function InvoiceReportScreen() {
  // TODO: Fetch actual invoice data from database
  const mockInvoices: Invoice[] = [
    {
      id: '1',
      companyName: '測試公司 A',
      date: '2025-05-24',
      items: [
        {
          name: '商品 1',
          amount: 100,
          quantity: 2,
          totalPrice: 200,
        },
      ],
      totalAmount: 200,
      paid: false,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>發票報表</Text>
      </View>
      {mockInvoices.map(invoice => (
        <View key={invoice.id} style={styles.invoiceCard}>
          <View style={styles.invoiceHeader}>
            <Text style={styles.companyName}>{invoice.companyName}</Text>
            <Text style={styles.date}>{invoice.date}</Text>
          </View>
          <View style={styles.itemsContainer}>
            {invoice.items.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                  ${item.amount} x {item.quantity} = ${item.totalPrice}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <Text style={styles.total}>總計: ${invoice.totalAmount}</Text>
            <Text
              style={[
                styles.status,
                invoice.paid ? styles.paid : styles.unpaid,
              ]}
            >
              {invoice.paid ? '已付款' : '未付款'}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  invoiceCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
  },
  itemsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    flex: 1,
  },
  itemDetails: {
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
  },
  paid: {
    backgroundColor: '#e6f4ea',
    color: '#1e8e3e',
  },
  unpaid: {
    backgroundColor: '#fce8e6',
    color: '#d93025',
  },
});
