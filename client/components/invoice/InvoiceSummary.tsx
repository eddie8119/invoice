import { theme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface InvoiceSummaryProps {
  unpaidTotal: string;
  overdueTotal: string;
}

export const InvoiceSummary = ({
  unpaidTotal,
  overdueTotal,
}: InvoiceSummaryProps) => {
  const colors = theme.colors.light;

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>未付總額</Text>
        <Text style={styles.summaryAmount}>TWD${unpaidTotal}</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>逾期總額</Text>
        <Text style={[styles.summaryAmount, { color: colors.error }]}>
          TWD${overdueTotal}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a237e',
  },
});
