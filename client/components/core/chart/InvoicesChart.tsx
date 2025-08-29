import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { VictoryPie } from 'victory';

interface Invoice {
  id: string;
  invoiceNumber: string;
  dueDate: string;
  totalAmount: number;
  status: string;
  caseId: string;
  paidAt: string | null;
  type: 'receivable' | 'payable';
  company: {
    id: string;
    name: string;
  };
}

interface InvoicesChartProps {
  data: any[] | undefined;
  chartTitle?: string;
  chartType?: 'payable' | 'receivable' | 'mixed';
}

export const InvoicesChart = ({
  data,
  chartTitle = '發票金額統計',
  chartType = 'mixed',
}: InvoicesChartProps) => {
  const screenWidth = Dimensions.get('window').width - 32;
  // Process data for the chart
  const { pieData, totalReceivable, totalPayable, colorScale } = useMemo(() => {
    // If no data, return empty arrays
    if (!data || data.length === 0) {
      return {
        pieData: [],
        totalReceivable: 0,
        totalPayable: 0,
        colorScale: [],
      };
    }

    // Calculate totals by type
    let totalReceivable = 0;
    let totalPayable = 0;

    // Group invoices by company and type for more detailed visualization
    const invoicesByCompany: Record<string, { amount: number; type: string }> =
      {};

    // Process each invoice
    data.forEach(invoice => {
      const companyName = invoice.company?.name || 'Unknown';
      const companyKey = `${companyName}-${invoice.type}`;

      if (!invoicesByCompany[companyKey]) {
        invoicesByCompany[companyKey] = {
          amount: 0,
          type: invoice.type,
        };
      }

      invoicesByCompany[companyKey].amount += invoice.totalAmount;

      if (invoice.type === 'receivable') {
        totalReceivable += invoice.totalAmount;
      } else {
        totalPayable += invoice.totalAmount;
      }
    });

    // Define color schemes based on chart type
    const greenShades = ['#00D09E', '#00A67E', '#008C68', '#007255', '#005842'];
    const blueShades = ['#0068FF', '#0055D4', '#0047B3', '#003A91', '#002D70'];

    // Create pie chart data
    let pieData: Array<{ x: string; y: number; color: string; label: string }> =
      [];
    let colorScale: string[] = [];

    if (chartType === 'mixed') {
      // For mixed type, show receivable vs payable
      pieData = [
        {
          x: '應收',
          y: totalReceivable,
          color: '#00D09E',
          label: `應收: $${totalReceivable.toLocaleString()}`,
        },
        {
          x: '應付',
          y: totalPayable,
          color: '#0068FF',
          label: `應付: $${totalPayable.toLocaleString()}`,
        },
      ];
      colorScale = ['#00D09E', '#0068FF'];
    } else {
      // For single type (payable or receivable), show breakdown by company
      const companyEntries = Object.entries(invoicesByCompany);
      const selectedShades =
        chartType === 'receivable' ? greenShades : blueShades;

      pieData = companyEntries
        .filter(([key, value]) => key.includes(chartType))
        .map(([key, value], index) => {
          const companyName = key.split('-')[0];
          const colorIndex = index % selectedShades.length;
          return {
            x: companyName,
            y: value.amount,
            color: selectedShades[colorIndex],
            label: `${companyName}: $${value.amount.toLocaleString()}`,
          };
        });

      // If we have more companies than colors, cycle through the colors
      colorScale = pieData.map(
        (item, index) => selectedShades[index % selectedShades.length]
      );
    }

    return { pieData, totalReceivable, totalPayable, colorScale };
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
  const displayTitle =
    chartType === 'receivable'
      ? '應收發票統計'
      : chartType === 'payable'
        ? '應付發票統計'
        : chartTitle;

  // Calculate total amount based on chart type
  const totalAmount =
    chartType === 'receivable'
      ? totalReceivable
      : chartType === 'payable'
        ? totalPayable
        : totalReceivable + totalPayable;

  // Prepare legend data based on chart type and limit to top 5 items by amount
  const legendData =
    chartType === 'mixed'
      ? [
          {
            name: `應收: $${totalReceivable.toLocaleString()}`,
            symbol: { fill: '#00D09E' },
            value: totalReceivable,
          },
          {
            name: `應付: $${totalPayable.toLocaleString()}`,
            symbol: { fill: '#0068FF' },
            value: totalPayable,
          },
        ]
      : pieData
          .map(item => ({
            name: `${item.x}: $${item.y.toLocaleString()}`,
            symbol: { fill: item.color },
            value: item.y,
          }))
          // Sort by amount (descending) and take top 5
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

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
            <Text style={styles.totalLabel}>
              {chartType === 'mixed'
                ? '發票總額'
                : chartType === 'receivable'
                  ? '應收總額'
                  : '應付總額'}
            </Text>
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
              <Text style={styles.legendText}>{item.name}</Text>
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
