import { recentTransactions } from '@/constants/dummyData';
import { theme } from '@/constants/theme';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Heading } from '../core/Heading';

// 交易項目組件
const TransactionItem = ({ company, date, amount, type }) => {
  const isIncome = type === 'income';
  const amountText = isIncome
    ? `+$${amount.toFixed(2)}`
    : `-$${Math.abs(amount).toFixed(2)}`;
  const amountColor = isIncome ? theme.colors.light.primaryOceanBlue : 'black';

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionAvatar}>
        <Text style={[styles.avatarText, { color: amountColor }]}>
          {isIncome ? '收' : '支'}
        </Text>
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.companyName}>{company}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>
      <Text style={[styles.transactionAmount, { color: amountColor }]}>
        {amountText}
      </Text>
    </View>
  );
};

export const TransactionsSection: React.FC = () => {
  return (
    <View style={styles.transactionsSection}>
      <Heading level={3}>近期交易記錄</Heading>
      <FlatList
        data={recentTransactions}
        renderItem={({ item }) => (
          <TransactionItem
            company={item.company}
            date={item.date}
            amount={item.amount}
            type={item.type}
          />
        )}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionsSection: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: theme.colors.light.primaryOceanBlue,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
  },
  transactionInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.light.text,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: theme.colors.light.textSecondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
