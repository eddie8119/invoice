import { pannelStyles } from '@/style/pannel';
import React from 'react';
import { Text, View } from 'react-native';

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface InvoiceItemsTableProps {
  company: string;
  invoiceNumber: string;
  status: string;
  totalAmount: number;
  createdAt: Date;
  dueDate: Date;
  paidAt?: Date;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  styles: any;
}

export const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({
  company,
  invoiceNumber,
  status,
  amount,
  totalAmountdAt,
  dueDate,
  paidAt,
  getStatusColor,
  getStatusText,
  styles,
}) => (
  <View style={pannelStyles.card}>
    <View style={styles.header}>
      <View>
        <Text style={styles.companyName}>{company}</Text>
        <Text style={styles.invoiceNumber}>#{invoiceNumber}</Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(status) },
        ]}
      >
        <Text style={styles.statusText}>{getStatusText(status)}</Text>
      </View>
    </View>
    <View style={styles.amountContainer}>
      <Text style={styles.amountLabel}>總金額</Text>
      <Text style={styles.amount}>
        <Text style={styles.currency}>TWD$</Text>
        <Text style={styles.amountValue}>{amount}</Text>
      </Text>
    </View>
    <View style={styles.dateInfo}>
      <View style={styles.dateItem}>
        <Text style={styles.dateLabel}>建立日期</Text>
        <Text style={styles.dateValue}>{createdAt.toLocaleDateString()}</Text>
      </View>
      <View style={styles.dateItem}>
        <Text style={styles.dateLabel}>預計付款日</Text>
        <Text style={styles.dateValue}>{dueDate.toLocaleDateString()}</Text>
      </View>
      {paidAt && (
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>實際付款日</Text>
          <Text style={styles.dateValue}>{paidAt.toLocaleDateString()}</Text>
        </View>
      )}
    </View>
  </View>
);
