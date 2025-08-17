import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export const CashFlowChart = () => {
  const screenWidth = Dimensions.get('window').width - 32; // 左右各留16的padding

  // 獲取當前月份和接下來的兩個月
  const currentDate = new Date();
  const months = [];

  for (let i = 0; i < 3; i++) {
    const month = new Date(currentDate);
    month.setMonth(currentDate.getMonth() + i);
    const monthName = i === 0 ? '本月' : i === 1 ? '下月' : '後月';
    const monthNum = month.getMonth() + 1;
    months.push(`${monthName}${monthNum}`);
  }

  // 模擬現金流數據
  const cashFlowData = [
    85000, // 本月
    68000, // 下月
    40000, // 後月
  ];

  // 準備圖表數據
  const data = {
    labels: months,
    datasets: [
      {
        data: cashFlowData,
        color: (opacity = 1) => `rgba(0, 200, 150, 1)`, // 更鮮豔的綠色現金流線
        strokeWidth: 4,
      },
    ],
    legend: ['現金流'],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`, // 更淺的灰色網格線
    labelColor: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`, // 灰色標籤
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '8',
      strokeWidth: '0',
      stroke: '#00c896',
      fill: '#e74c3c', // 紅色圓點
    },
    formatYLabel: (value: string) => {
      const num = parseInt(value);
      if (num >= 1000) {
        return `${num / 1000}k`;
      }
      return value;
    },
    // 增加更多配置使圖表更美觀
    propsForBackgroundLines: {
      strokeDasharray: '', // 實線而非虛線
      strokeWidth: 1,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>現金流預測</Text>

      <LineChart
        data={data}
        width={screenWidth}
        height={150}
        chartConfig={chartConfig}
        style={styles.chart}
        bezier
        withHorizontalLabels={true}
        withVerticalLabels={true}
        withInnerLines={true}
        withOuterLines={false}
        withShadow={false}
        segments={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
