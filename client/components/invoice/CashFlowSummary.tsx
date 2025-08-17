import Loading from '@/components/core/Loading';
import { SummaryCard } from '@/components/core/SummaryCard';
import { useMonthlyTotals } from '@/hooks/useMonthlyTotals';
import { InvoiceType } from '@/types/invoice';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CashFlowSummaryProps {
  activeFilter: InvoiceType;
}

export const CashFlowSummary = ({ activeFilter }: CashFlowSummaryProps) => {
  const { monthlyTotals, isLoading } = useMonthlyTotals(activeFilter);

  // 獲取本月、下月和後月的數據
  const currentMonth = monthlyTotals.find(item => item.label === '本月');
  const nextMonth = monthlyTotals.find(item => item.label === '下月');
  const futureMonth = monthlyTotals.find(
    item => item.label !== '本月' && item.label !== '下月'
  );

  // 路由跳轉處理
  const handleCardPress = (month: number) => {
    router.push({
      pathname: `/accounts-${activeFilter}`,
      params: { month: month.toString() },
    } as any);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {currentMonth && (
        <SummaryCard
          label={`本月將${activeFilter}`}
          amount={currentMonth.totalAmount.toString()}
          cardStyle={styles.card}
          onPress={() => {
            handleCardPress(currentMonth.month);
          }}
        />
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {nextMonth && (
          <SummaryCard
            label={`下月將${activeFilter}`}
            amount={nextMonth.totalAmount.toString()}
            cardStyle={styles.card}
            onPress={() => {
              handleCardPress(nextMonth.month);
            }}
          />
        )}
        {futureMonth && (
          <SummaryCard
            label={`${futureMonth.label}將${activeFilter}`}
            amount={futureMonth.totalAmount.toString()}
            cardStyle={styles.card}
            onPress={() => {
              handleCardPress(futureMonth.month);
            }}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
    flex: 1,
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
