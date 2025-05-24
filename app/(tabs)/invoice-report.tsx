import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

interface InvoiceItem {
  month: string;
  amount: number;
}

const invoiceData: InvoiceItem[] = [
  { month: '2020/10', amount: 0 },
  { month: '2020/09', amount: 1085.37 },
  { month: '2020/08', amount: 205.0 },
  { month: '2020/07', amount: 130727.3 },
  { month: '2020/06', amount: 8511.0 },
  { month: '2020/05', amount: 253377.0 },
  { month: '2020/04', amount: 5600.0 },
  { month: '2020/03', amount: 110.0 },
  { month: '2020/02', amount: 0 },
  { month: '2020/01', amount: 0 },
  { month: '2019/12', amount: 0 },
  { month: '2019/11', amount: 1208.9 },
];

export default function InvoiceReport() {
  const totalAmount = invoiceData.reduce((sum, item) => sum + item.amount, 0);
  const overdueAmount = 125213.37;

  const renderItem = ({ item }: { item: InvoiceItem }) => (
    <View style={styles.invoiceItem}>
      <Text style={styles.month}>{item.month}</Text>
      <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Report',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FFF5F5' },
        }}
      />

      <View style={styles.header}>
        <Text style={styles.dateRange}>1 Nov, 2019 - 31 Oct, 2020</Text>
        <Text style={styles.overdueText}>Overdue</Text>
        <Text style={styles.overdueAmount}>${overdueAmount}</Text>
        <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
      </View>

      <View style={styles.tabContainer}>
        <View style={styles.activeTab}>
          <Text style={styles.activeTabText}>Invoice</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Paid</Text>
        </View>
      </View>

      <FlatList
        data={invoiceData}
        renderItem={renderItem}
        keyExtractor={item => item.month}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    padding: 20,
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  overdueText: {
    fontSize: 14,
    color: '#FF4444',
    marginBottom: 4,
  },
  overdueAmount: {
    fontSize: 24,
    color: '#FF4444',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  list: {
    backgroundColor: 'white',
  },
  invoiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  month: {
    fontSize: 16,
    color: '#333',
  },
  amount: {
    fontSize: 16,
    color: '#007AFF',
  },
});
