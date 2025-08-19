import { CashFlowChart } from '@/components/core/chart/CashFlowChart';
import { PayFilter } from '@/components/core/filter/PayFilter';
import { SummaryCard } from '@/components/core/SummaryCard';
import { CashFlowSummary } from '@/components/invoice/CashFlowSummary';
import { createContainerStyles } from '@/style/layouts/containers';
import { InvoiceType } from '@/types/invoice';
import { useTheme } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function CashFlowPredict() {
  const [activeFilter, setActiveFilter] = useState<InvoiceType>('receivable');

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
        <SummaryCard
          label={`目前帳戶現金水位`}
          amount="20000"
          cardStyle={styles.card}
        />
        <CashFlowChart />
      </View>
      <ScrollView
        style={containerStyles.lowerSection}
        contentContainerStyle={{ gap: 16 }}
      >
        <PayFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onFilterChange={() => {}}
        />
        <CashFlowSummary activeFilter={activeFilter} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
  },
});
