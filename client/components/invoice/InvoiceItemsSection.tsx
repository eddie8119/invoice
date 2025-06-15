import H3Title from '@/components/core/H3Title';
import { theme } from '@/constants/theme';
import { pannelStyles } from '@/style/pannel';
import { InvoiceItem } from '@/types/invoice';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface InvoiceItemsSectionProps {
  items: InvoiceItem[];
  calculateTotal: (items: InvoiceItem[]) => number;
}

export const InvoiceItemsSection: React.FC<InvoiceItemsSectionProps> = ({ items, calculateTotal }) => {
  return (
    <View style={[pannelStyles.card, styles.section]}>
      <H3Title title="項目明細" />

      <View style={styles.itemsHeader}>
        <Text style={[styles.itemHeaderText, { flex: 2 }]}>項目名稱</Text>
        <Text
          style={[
            styles.itemHeaderText,
            { flex: 1, textAlign: 'center' },
          ]}
        >
          數量
        </Text>
        <Text
          style={[styles.itemHeaderText, { flex: 1, textAlign: 'right' }]}
        >
          單價
        </Text>
        <Text
          style={[styles.itemHeaderText, { flex: 1, textAlign: 'right' }]}
        >
          小計
        </Text>
      </View>

      {items.map(item => (
        <View key={item.id} style={styles.itemRow}>
          <Text style={[styles.itemText, { flex: 2 }]}>{item.name}</Text>
          <Text
            style={[styles.itemText, { flex: 1, textAlign: 'center' }]}
          >
            {item.quantity}
          </Text>
          <Text
            style={[styles.itemText, { flex: 1, textAlign: 'right' }]}
          >
            {item.price}
          </Text>
          <Text
            style={[styles.itemText, { flex: 1, textAlign: 'right' }]}
          >
            {item.quantity * item.price}
          </Text>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>總計</Text>
        <Text style={styles.totalValue}>
          TWD$ {calculateTotal(items)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  itemsHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.light.divider,
    marginBottom: 8,
  },
  itemHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.light.textSecondary,
  },
  itemRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.light.divider,
  },
  itemText: {
    fontSize: 14,
    color: theme.colors.light.text,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.light.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.light.primaryOceanBlue,
  },
});
