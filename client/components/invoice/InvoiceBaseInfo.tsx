import H3 from '@/components/core/H3';
import { pannelStyles } from '@/style/pannel';
import { textStyles } from '@/style/text';
import type { InvoiceStatus } from '@/utils/invoice';
import { getStatusColor, getStatusText } from '@/utils/invoice';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface InvoiceBaseInfoProps {
  invoice: {
    company: string;
    invoiceNumber: string;
    status: InvoiceStatus;
    amount: number;
    createdAt: Date;
    expectPaidAt: Date;
    paidAt?: Date;
  };
}

export const InvoiceBaseInfo: React.FC<InvoiceBaseInfoProps> = ({
  invoice,
}) => {
  return (
    <View style={[pannelStyles.card]}>
      <View style={styles.header}>
        <View>
          <H3 title={invoice.company} style={{ marginBottom: 0 }} />
          <Text style={styles.subInfo}>#{invoice.invoiceNumber}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(invoice.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(invoice.status)}</Text>
        </View>
      </View>
      <View style={[{ marginBottom: 16 }]}>
        <Text style={styles.label}>總金額</Text>
        <View style={styles.amountRow}>
          <Text style={styles.label}>TWD$</Text>
          <Text style={styles.amountValue}>{invoice.amount}</Text>
        </View>
      </View>
      <View style={styles.dateInfo}>
        <View style={styles.dateItem}>
          <Text style={textStyles.date}>建立日期</Text>
          <Text style={textStyles.date}>
            {invoice.createdAt.toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.dateItem}>
          <Text style={textStyles.date}>預計付款日</Text>
          <Text style={textStyles.date}>
            {invoice.expectPaidAt.toLocaleDateString()}
          </Text>
        </View>
        {invoice.paidAt && (
          <View style={styles.dateItem}>
            <Text style={textStyles.date}>實際付款日</Text>
            <Text style={textStyles.date}>
              {invoice.paidAt.toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  company: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    // marginBottom: 4,
  },
  subInfo: {
    color: '#888',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amountValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginLeft: 2,
  },
  dateInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateItem: {
    marginRight: 24,
    marginBottom: 8,
  },
});
