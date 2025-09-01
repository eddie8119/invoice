import { CashFlowSummary } from '@/components/cash/CashFlowSummary';
import { DatePicker } from '@/components/core/cash/DatePicker';
import { CashFlowChart } from '@/components/core/chart/CashFlowChart';
import { PayFilter } from '@/components/core/filter/PayFilter';
import { SummaryCard } from '@/components/core/SummaryCard';
import { theme } from '@/constants/theme';
import { createContainerStyles } from '@/style/layouts/containers';
import { InvoiceType } from '@/types/invoice';
import { useTheme } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function CashFlowPredictScreen() {
  const [activeFilter, setActiveFilter] = useState<InvoiceType>('receivable');

  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[containerStyles.lowerSection, { gap: 16 }]}>
        <SummaryCard
          label={`今日即時現金流`}
          amount="2000"
          cardStyle={{}}
          textColor={theme.colors.light.primary}
        />
        <DatePicker />
        <CashFlowChart />
        <PayFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onFilterChange={() => {}}
        />
        <CashFlowSummary activeFilter={activeFilter} />
      </View>
    </ScrollView>
  );
}
