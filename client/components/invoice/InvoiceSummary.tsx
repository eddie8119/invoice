import { theme } from '@/constants/theme';
import { pannelStyles } from '@/style/pannel';
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
      <View style={[pannelStyles.summaryCard]}>
        <Text style={styles.summaryLabel}>未付總額</Text>
        <Text style={styles.summaryAmount}>
          <Text style={styles.dollarSign}>TWD$</Text>
          <Text style={styles.summaryAmount}>{unpaidTotal}</Text>
        </Text>
      </View>

      <View style={[pannelStyles.summaryCard]}>
        <Text style={[styles.summaryLabel]}>逾期總額</Text>
        <Text style={[styles.summaryAmount, { color: colors.error }]}>
          <Text style={styles.dollarSign}>TWD$</Text>
          {overdueTotal}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.light.primaryOceanBlue,
  },
  dollarSign: {
    fontSize: 16,
    color: theme.colors.light.primary,
  },
});
