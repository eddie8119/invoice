import { Heading } from '@/components/core/Heading';
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
    totalAmount: number;
    createdAt: Date;
    dueDate: Date;
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
          <Heading level={3} marginBottom={0}>
            {invoice.company}
          </Heading>
          <Text style={textStyles.lebal}>#{invoice.invoiceNumber}</Text>
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
        <Text style={textStyles.lebal}>總金額</Text>
        <View style={styles.amountRow}>
          <Text style={textStyles.lebal}>TWD$</Text>
          <Text style={styles.amountValue}>{invoice.amount}</Text>
        </View>
      </View>
      <View style={styles.dateInfo}>
        <View style={styles.dateItem}>
          <Text style={textStyles.lebal}>建立日期</Text>
          <Text style={textStyles.lebal}>
            {invoice.createdAt.toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.dateItem}>
          <Text style={textStyles.lebal}>預計付款日</Text>
          <Text style={textStyles.lebal}>
            {invoice.dueDate.toLocaleDateString()}
          </Text>
        </View>
        {invoice.paidAt && (
          <View style={styles.dateItem}>
            <Text style={textStyles.lebal}>實際付款日</Text>
            <Text style={textStyles.lebal}>
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
