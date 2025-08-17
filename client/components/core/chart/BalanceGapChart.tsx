import Loading from '@/components/core/Loading';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTheme,
} from 'victory';

interface BalanceGapChartProps {
  monthlyTotals: any[];
  isLoading: boolean;
}

export const BalanceGapChart = ({
  monthlyTotals,
  isLoading,
}: BalanceGapChartProps) => {
  const screenWidth = Dimensions.get('window').width - 32;

  if (isLoading || !monthlyTotals || monthlyTotals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>收支差異</Text>
        <View style={styles.emptyChart}>
          <Loading />
        </View>
      </View>
    );
  }

  const incomeData = monthlyTotals.map(m => ({
    x: m.label,
    y: m.receivableTotal,
  }));
  const expenseData = monthlyTotals.map(m => ({
    x: m.label,
    y: m.payableTotal,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>收支差異</Text>

      <VictoryChart
        width={screenWidth}
        theme={VictoryTheme.material}
        domainPadding={{ x: 30 }}
      >
        <VictoryAxis style={{ tickLabels: { fontSize: 12, fill: '#666' } }} />
        <VictoryAxis
          dependentAxis
          tickFormat={t => `${t / 1000}k`}
          style={{ tickLabels: { fontSize: 12, fill: '#666' } }}
        />

        <VictoryGroup offset={20}>
          <VictoryBar
            data={incomeData}
            style={{ data: { fill: '#0068FF', width: 16 } }}
          />
          <VictoryBar
            data={expenseData}
            style={{ data: { fill: '#00D09E', width: 16 } }}
          />
        </VictoryGroup>
      </VictoryChart>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#0068FF' }]} />
          <Text style={styles.legendText}>收入</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#00D09E' }]} />
          <Text style={styles.legendText}>支出</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
    color: '#333',
  },
  emptyChart: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});
