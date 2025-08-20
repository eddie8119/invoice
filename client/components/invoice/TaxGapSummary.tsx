import Loading from '@/components/core/Loading';
import { SummaryCard } from '@/components/core/SummaryCard';
import { router } from 'expo-router';

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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

  // 渲染每個月份的項目
  const renderMonthItem = ({
    item: month,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <View>
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
          onPress={() => {
            router.push({
              pathname: `/invoice?type=receivable`,
              params: { month: month.month.toString() },
            } as any);
          }}
        />
        <SummaryCard
          label={`${month.label}支出`}
          amount={formatAmount(month.payableTotal)}
          cardStyle={styles.card}
          onPress={() => {
            router.push({
              pathname: `/invoice?type=payable`,
              params: { month: month.month.toString() },
            } as any);
          }}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={monthlyTotals}
      renderItem={renderMonthItem}
      keyExtractor={(item, index) => `month-${index}`}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16,
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
