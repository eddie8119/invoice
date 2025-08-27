import Loading from '@/components/core/Loading';
import { useMonthlyInvoices } from '@/hooks/useMonthlyInvoices';
import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { VictoryChart, VictoryTheme } from 'victory';
import { ChartLine, DataPoints, XAxis, YAxis } from './ChartComponents';
import {
  filterNegativeData,
  filterPositiveData,
  prepareChartData,
  processCashFlowData,
} from './dataUtils';

/**
 * Main CashFlowChart component
 */
export const CashFlowChartMain = () => {
  const screenWidth = Dimensions.get('window').width - 32; // 左右各留16的padding
  const { monthlyInvoices, isLoading } = useMonthlyInvoices();

  // 處理現金流數據
  const { dailyCashFlow, threeMonthLabels, monthlyDataPoints } = useMemo(
    () => processCashFlowData(monthlyInvoices || []),
    [monthlyInvoices]
  );

  // 為 Victory 圖表準備數據
  const chartData = useMemo(
    () => prepareChartData(monthlyDataPoints),
    [monthlyDataPoints]
  );

  // 檢查是否正在載入或沒有數據
  if (isLoading || !chartData || chartData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>現金水位</Text>
        <View style={styles.emptyChart}>
          <Loading />
        </View>
      </View>
    );
  }

  // 過濾正值和負值數據
  const positiveData = filterPositiveData(chartData);
  const negativeData = filterNegativeData(chartData);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>現金水位</Text>

      <VictoryChart
        width={screenWidth}
        height={240}
        theme={VictoryTheme.material}
        domainPadding={{ y: 25 }}
        domain={{ x: [0.8, 3.2] }} // 設定 x 軸範圍為三個月，並移除左側空白
        padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
      >
        {/* X軸 */}
        <XAxis threeMonthLabels={threeMonthLabels} />

        {/* Y軸 */}
        <YAxis />

        {/* 大於0的線段顯示綠色 */}
        <ChartLine data={positiveData} color="#00C896" />

        {/* 小於0的線段顯示紅色 */}
        <ChartLine data={negativeData} color="#FF5252" />

        {/* 數據點和提示 */}
        <DataPoints data={chartData} />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  emptyChart: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
});
