import Loading from '@/components/core/Loading';
import { SummaryCard } from '@/components/core/SummaryCard';
import { useMonthlyBalance } from '@/hooks/useMonthlyBalance';
import { t } from '@/i18n';
import { InvoiceType } from '@/types/invoice';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CashFlowSummaryProps {
  activeFilter: InvoiceType;
}

export const CashFlowSummary = ({ activeFilter }: CashFlowSummaryProps) => {
  const { monthlyBalance, isLoading } = useMonthlyBalance();
  const { colors } = useTheme();

  // 獲取本月、下月和後月的數據
  const currentMonth = monthlyBalance.find(item => item.label === '本月');
  const nextMonth = monthlyBalance.find(item => item.label === '下月');
  const futureMonth = monthlyBalance.find(
    item => item.label !== '本月' && item.label !== '下月'
  );

  // 路由跳轉處理
  const handleCardPress = (month: number) => {
    router.push({
      pathname: '/invoice',
      params: { type: activeFilter, month: month.toString() },
    } as any);
  };

  // 根據 activeFilter 選擇顯示的金額屬性
  const getAmountByFilter = (item: any) => {
    if (!item) return '0';
    return activeFilter === 'receivable'
      ? item.receivableTotal.toString()
      : item.payableTotal.toString();
  };

  const textColor: string | undefined =
    activeFilter === 'receivable' ? colors.primary : undefined;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      {currentMonth && (
        <SummaryCard
          label={`本月將${t(`accounting.${activeFilter}`)}`}
          amount={getAmountByFilter(currentMonth)}
          cardStyle={styles.card}
          textColor={textColor}
          onPress={() => {
            handleCardPress(currentMonth.month);
          }}
        />
      )}
      {nextMonth && (
        <SummaryCard
          label={`下月將${t(`accounting.${activeFilter}`)}`}
          amount={getAmountByFilter(nextMonth)}
          cardStyle={styles.card}
          textColor={textColor}
          onPress={() => {
            handleCardPress(nextMonth.month);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
