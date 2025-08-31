import { TaxGapSummary } from '@/components/cash/TaxGapSummary';
import { BalanceGapChart } from '@/components/core/chart/BalanceGapChart';
import { useMonthlyBalance } from '@/hooks/useMonthlyBalance';
import { createContainerStyles } from '@/style/layouts/containers';
import { useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

export default function TaxSavingGapScreen() {
  const { monthlyBalance, isLoading } = useMonthlyBalance();

  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={containerStyles.upperSection}>
        <BalanceGapChart isLoading={isLoading} monthlyTotals={monthlyBalance} />
      </View>
      <View style={[containerStyles.lowerSection, { gap: 16 }]}>
        <TaxGapSummary isLoading={isLoading} monthlyBalance={monthlyBalance} />
      </View>
    </ScrollView>
  );
}
