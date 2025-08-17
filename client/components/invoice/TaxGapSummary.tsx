import Loading from '@/components/core/Loading';
import { SummaryCard } from '@/components/core/SummaryCard';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TaxGapSummaryProps {
  monthlyTotals: any;
  isLoading: boolean;
}

export const TaxGapSummary = ({
  monthlyTotals,
  isLoading,
}: TaxGapSummaryProps) => {
  if (isLoading) {
    return <Loading />;
  }

  // 格式化金額顯示
  const formatAmount = (amount: number) => {
    return amount.toString();
  };

  return (
    <>
      {/* 使用迴圈顯示每個月份的數據 */}
      {monthlyTotals.map((month, index) => (
        <View key={`month-${index}`} style={styles.monthContainer}>
          <Text style={styles.monthTitle}>{month.monthName}</Text>

          {/* 收支差額卡片 */}
          <SummaryCard
            label={`${month.label}收支差額`}
            amount={formatAmount(month.balanceGap)}
            cardStyle={styles.card}
          />

          {/* 收入和支出卡片 */}
          <View style={styles.rowContainer}>
            <SummaryCard
              label={`${month.label}收入`}
              amount={formatAmount(month.receivableTotal)}
              cardStyle={styles.card}
            />
            <SummaryCard
              label={`${month.label}支出`}
              amount={formatAmount(month.payableTotal)}
              cardStyle={styles.card}
            />
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
    flex: 1,
  },
  monthContainer: {
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
  },
});
