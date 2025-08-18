import { BalanceGapChart } from '@/components/core/chart/BalanceGapChart';
import { TaxGapSummary } from '@/components/invoice/TaxGapSummary';
import { useMonthlyBalance } from '@/hooks/useMonthlyBalance';
import { createContainerStyles } from '@/style/layouts/containers';
import { useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function TaxSavingGap() {
  const { monthlyBalance, isLoading } = useMonthlyBalance();

  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <View style={{ flex: 1 }}>
      <View style={containerStyles.upperSection}>
        <BalanceGapChart isLoading={isLoading} monthlyTotals={monthlyBalance} />
      </View>
      <ScrollView
        style={containerStyles.lowerSection}
        contentContainerStyle={{ gap: 16 }}
      >
        <TaxGapSummary isLoading={isLoading} monthlyTotals={monthlyBalance} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
  },
});
