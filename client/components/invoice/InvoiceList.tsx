import { theme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Invoice {
  id: string;
  company: string;
  amount: string;
  createdAt: Date;
  paidAt: Date | null;
  status: 'paid' | 'unpaid' | 'overdue';
  invoiceNumber: string;
}

interface InvoiceListProps {
  invoices: Invoice[];
  onInvoicePress: (invoice: Invoice) => void;
}

export const InvoiceList = ({ invoices, onInvoicePress }: InvoiceListProps) => {
  const colors = theme.colors.light;

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return colors.success;
      case 'unpaid':
        return colors.primary;
      case 'overdue':
        return colors.error;
      default:
        return colors.text;
    }
  };

  const getStatusText = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return '已付';
      case 'unpaid':
        return '未付';
      case 'overdue':
        return '逾期';
      default:
        return '';
    }
  };

  const getStatusMessage = (status: Invoice['status'], date: string) => {
    switch (status) {
      case 'paid':
        return '';
      case 'unpaid':
        return '在天天之內到期';
      case 'overdue':
        return '逾期3天';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      {invoices.map(invoice => (
        <TouchableOpacity
          key={invoice.id}
          style={styles.card}
          onPress={() => onInvoicePress(invoice)}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Text style={styles.companyName}>{invoice.company}</Text>
              <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>

              {getStatusMessage(
                invoice.status,
                invoice.createdAt.toLocaleDateString()
              ) && (
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(invoice.status) },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusMessage,
                      { color: getStatusColor(invoice.status) },
                    ]}
                  >
                    {getStatusMessage(invoice.status, invoice.createdAt)}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.cardRight}>
              <Text style={styles.amount}>TWD$ {invoice.amount}</Text>
              <Text style={styles.date}>
                建立日期: {invoice.createdAt.toLocaleDateString()}
              </Text>
              {invoice.paidAt && (
                <Text style={styles.date}>
                  付款日期: {invoice.paidAt.toLocaleDateString()}
                </Text>
              )}

              <TouchableOpacity
                style={[
                  styles.statusButton,
                  { backgroundColor: getStatusColor(invoice.status) },
                ]}
              >
                <Text style={styles.statusButtonText}>
                  {getStatusText(invoice.status)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusMessage: {
    fontSize: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  statusButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});
