import { FilterOption } from '@/components/core/Filter';
import { SummaryCard } from '@/components/core/SummaryCard';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CashFlowSummaryProps {
  activeFilter: FilterOption;
}

export const CashFlowSummary = ({ activeFilter }: CashFlowSummaryProps) => {
  const currentDate = new Date();
  const nextMonth = currentDate.getMonth() + 2;
  const nextNextMonth = currentDate.getMonth() + 3;

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <SummaryCard
          label={`下月將${activeFilter}`}
          amount="10000"
          cardStyle={styles.card}
          onPress={() => {
            router.push({
              pathname: `/accounts-${activeFilter}`,
              params: { month: nextMonth },
            } as any);
          }}
        />
        <SummaryCard
          label={`後月將${activeFilter}`}
          amount="20000"
          cardStyle={styles.card}
          onPress={() => {
            router.push({
              pathname: `/accounts-${activeFilter}`,
              params: { month: nextNextMonth },
            } as any);
          }}
        />
      </View>
      <SummaryCard
        label={`本月將${activeFilter}`}
        amount="20000"
        cardStyle={styles.card}
        onPress={() => {
          // 使用 as 類型斷言告訴 TypeScript 這是一個有效的路由
          router.push(`/accounts-${activeFilter}` as any);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
  },
});
