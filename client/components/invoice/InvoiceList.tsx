import { theme } from '@/constants/theme';
import { pannelStyles } from '@/style/pannel';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Invoice {
  id: string;
  company: string;
  amount: string;
  createdAt: Date;
  paidAt: Date | null;
  expectPaidAt: Date | null;
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
        return colors.primaryOceanBlue;
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

  const getStatusMessage = (
    status: Invoice['status'],
    expectPaidAt: Date | null
  ) => {
    if (status === 'paid') return '';
    if (status === 'unpaid') {
      const today = new Date(); // Assume this is June 8, 2025

      // This is your current condition:
      if (expectPaidAt && expectPaidAt > today) {
        // Logic A: expectPaidAt is provided AND it's after today
        const diffMs = expectPaidAt.getTime() - today.getTime();
        const diffDays = Math.max(
          0,
          Math.round(diffMs / (1000 * 60 * 60 * 24))
        );
        return `在${diffDays}天內到期`;
      }

      // Logic B: Fallback (if expectPaidAt is null OR expectPaidAt is today or in the past)
      const year = today.getFullYear();
      const month = today.getMonth();
      const lastDay = new Date(year, month + 1, 0); // This will be June 30, 2025
      const diffMs = lastDay.getTime() - today.getTime();
      const diffDays = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
      return `在${diffDays}天內到期月底`;
    }
    if (status === 'overdue') return '逾期3天';
    return '';
  };

  return (
    <View style={styles.container}>
      {invoices.map(invoice => (
        <TouchableOpacity
          key={invoice.id}
          style={[pannelStyles.card, { marginBottom: 12 }]}
          onPress={() => onInvoicePress(invoice)}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Text style={styles.companyName}>{invoice.company}</Text>
              <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>

              {getStatusMessage(invoice.status, invoice.expectPaidAt) && (
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
              <Text>
                TWD$
                <Text style={styles.amount}>{invoice.amount}</Text>
              </Text>
              <Text style={styles.date}>
                建立日期: {invoice.createdAt.toLocaleDateString()}
              </Text>

              <View style={styles.paidDateAndStatusContainer}>
                {invoice.paidAt && (
                  <Text style={[styles.paidDateText]}>
                    日期: {invoice.paidAt.toLocaleDateString()}
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
  cardContent: {
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
    color: theme.colors.light.primaryOceanBlue,
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
  paidDateAndStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4, // Adjust as needed for spacing
  },
  paidDateText: {
    marginRight: 8, // Add some space between paid date and status button
    // No marginBottom here as it's handled by the container's marginTop or overall cardRight padding
  },
});
