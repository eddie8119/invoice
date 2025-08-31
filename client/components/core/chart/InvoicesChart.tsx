import {
  LegendItem as LegendItemType,
  ShowPayableReceivableType,
} from '@/types/chart';
import {
  generateLegendData,
  getChartTitle,
  getTotalAmount,
  getTotalLabel,
  InvoiceData,
  processInvoiceData,
} from '@/utils/chartUtils';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { VictoryPie } from 'victory';

// Component for legend items that handles navigation
const LegendItem = ({ item }: { item: LegendItemType }) => {
  const router = useRouter();

  const handlePress = () => {
    if (item.id) {
      // Using string for pathname to avoid TypeScript issues
      router.push({
        pathname: '/(tabs)/invoice-details' as any,
        params: { id: item.id },
      });
    }
  };

  return (
    <Pressable onPress={item.id ? handlePress : undefined}>
      <Text style={styles.legendText}>{item.name}</Text>
    </Pressable>
  );
};

interface InvoicesChartProps {
  data: InvoiceData[] | undefined;
  chartTitle?: string;
  chartType?: ShowPayableReceivableType;
}

export const InvoicesChart = ({
  data,
  chartTitle = '發票金額統計',
  chartType = 'mixed',
}: InvoicesChartProps) => {
  // Process data for the chart using utility function
  const { pieData, totalReceivable, totalPayable, colorScale, invoiceIdMap } =
    useMemo(() => {
      return processInvoiceData(data, chartType);
    }, [data, chartType]);

  // If no data, show empty state
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyChart}>
          <Text>暫無發票數據</Text>
        </View>
      </View>
    );
  }

  // Determine chart title based on chartType
  const displayTitle = getChartTitle(chartType, chartTitle);

  // Calculate total amount based on chart type
  const totalAmount = getTotalAmount(chartType, totalReceivable, totalPayable);

  // Prepare legend data based on chart type and limit to top 5 items by amount
  const legendData = useMemo(() => {
    return generateLegendData(
      chartType,
      totalReceivable,
      totalPayable,
      pieData,
      invoiceIdMap
    );
  }, [chartType, totalReceivable, totalPayable, pieData, invoiceIdMap]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{displayTitle}</Text>

      <View style={styles.mainContainer}>
        {/* Left side: Pie Chart */}
        <View style={styles.chartContainer}>
          <VictoryPie
            data={pieData}
            width={200}
            height={200}
            colorScale={colorScale}
            innerRadius={50}
            labelRadius={80}
            padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
            style={{
              data: {
                fillOpacity: 0.9,
                stroke: '#fff',
                strokeWidth: 2,
              },
              labels: {
                fill: 'transparent', // Hide default labels
              },
            }}
            animate={{
              duration: 800,
              easing: 'bounce',
            }}
          />

          {/* Center text showing total */}
          <View style={styles.centerText}>
            <Text style={styles.totalAmount}>
              ${totalAmount.toLocaleString()}
            </Text>
            <Text style={styles.totalLabel}>{getTotalLabel(chartType)}</Text>
          </View>
        </View>

        {/* Right side: Legend */}
        <View style={styles.legendContainer}>
          {legendData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: item.symbol.fill },
                ]}
              />
              <LegendItem item={item} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 200,
  },
  centerText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -30 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyChart: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 16,
  },
  legendContainer: {
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 16,
    color: '#666',
  },
});
