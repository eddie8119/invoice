import Loading from '@/components/core/Loading';
import { SummaryCard } from '@/components/core/SummaryCard';
import { RevenueDetailModal } from '@/components/Modal/RevenueDetailModal';
import { theme } from '@/constants/theme';
import { useMonthlyInvoices } from '@/hooks/useMonthlyInvoices';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface TaxGapSummaryProps {
  monthlyBalance: any;
  isLoading: boolean;
}

export const TaxGapSummary = ({
  monthlyBalance,
  isLoading,
}: TaxGapSummaryProps) => {
  const colors = theme.colors.light;
  const { monthlyInvoices } = useMonthlyInvoices();

  const [revenueDetailModalVisible, setRevenueDetailModalVisible] =
    useState(false);
  const [selectedMonthData, setSelectedMonthData] = useState<any>(undefined);

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
        textColor={
          Number(formatAmount(month.balanceGap)) < 0
            ? colors.error
            : colors.primary
        }
        onPress={() => {
          setSelectedMonthData(monthlyInvoices[index]);
          setRevenueDetailModalVisible(true);
        }}
      />

      {/* 收入和支出卡片 */}
      <View style={styles.rowContainer}>
        <SummaryCard
          label={`${month.label}收入`}
          amount={formatAmount(month.receivableTotal)}
          cardStyle={styles.card}
          textColor={theme.colors.light.primary}
          onPress={() => {
            router.push({
              pathname: '/invoice',
              params: { type: 'receivable', month: month.month.toString() },
            } as any);
          }}
        />
        <SummaryCard
          label={`${month.label}支出`}
          amount={formatAmount(month.payableTotal)}
          cardStyle={styles.card}
          onPress={() => {
            router.push({
              pathname: '/invoice',
              params: { type: 'payable', month: month.month.toString() },
            } as any);
          }}
        />
      </View>
    </View>
  );

  return (
    <>
      <FlatList
        data={monthlyBalance}
        renderItem={renderMonthItem}
        keyExtractor={(item, index) => `month-${index}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
      />
      <RevenueDetailModal
        visible={revenueDetailModalVisible}
        selectedMonthData={selectedMonthData}
        onClose={() => setRevenueDetailModalVisible(false)}
      />
    </>
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
