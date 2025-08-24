import { CashFlowChart } from '@/components/core/chart/CashFlowChart';
import { PayFilter } from '@/components/core/filter/PayFilter';
import { CashFlowSummary } from '@/components/invoice/CashFlowSummary';
import { createContainerStyles } from '@/style/layouts/containers';
import { InvoiceType } from '@/types/invoice';
import { useTheme } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

export default function CashFlowPredict() {
  const [activeFilter, setActiveFilter] = useState<InvoiceType>('receivable');

  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  const calcHeight = Dimensions.get('window').height - 326 - 80 - 56;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ height: calcHeight }}>
        <CashFlowChart />
      </View>

      <View style={[containerStyles.lowerSection, { gap: 16 }]}>
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
