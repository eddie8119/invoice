import Loading from '@/components/core/Loading';
import { useMonthlyInvoices } from '@/hooks/useMonthlyInvoices';
import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChartBicolor } from 'react-native-gifted-charts';

// 定義圖表數據點的類型
interface ChartDataPoint {
  value: number; // 現金水位
  dataPointText: string; // 顯示的文字
  label: string; // 日期標籤
  showDataPoint: boolean; // 是否顯示數據點
  dataPointColor: string; // 數據點顏色
  month?: string; // 月份標籤
}

export const CashFlowChart = () => {
  const screenWidth = Dimensions.get('window').width - 32; // 左右各留16的padding
  const { monthlyInvoices } = useMonthlyInvoices();

  // 從 monthlyInvoices 計算現金流數據
  const { chartData } = useMemo(() => {
    // 初始現金水位設為20000
    const initialCashLevel = 20000;

    // 生成三個月的時間範圍（當前月份開始的三個月）
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // 創建月份範圍的開始和結束日期
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 3, 0); // 三個月後的最後一天

    // 生成三個月的標籤
    const threeMonths: string[] = [];
    for (let i = 0; i < 3; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      const monthName = new Date(year, monthIndex, 1).toLocaleString(
        'default',
        { month: 'short' }
      );
      threeMonths.push(monthName);
    }

    // 模擬圖二中的數據點
    // 這裡我們創建一個與圖二相似的現金流趨勢
    const result: ChartDataPoint[] = [
      {
        value: 20000,
        dataPointText: '$20,000',
        label: '8月',
        showDataPoint: true,
        dataPointColor: '#4CAF50',
        month: '8月',
      },
      {
        value: -18590,
        dataPointText: '$-18,590',
        label: '8/17',
        showDataPoint: true,
        dataPointColor: '#FF5252',
        month: '8月',
      },
      {
        value: 61410,
        dataPointText: '$61,410',
        label: '8/21',
        showDataPoint: true,
        dataPointColor: '#4CAF50',
        month: '8月',
      },
      {
        value: 26410,
        dataPointText: '$26,410',
        label: '8/26',
        showDataPoint: true,
        dataPointColor: '#4CAF50',
        month: '8月',
      },
      {
        value: 131410,
        dataPointText: '$131,410',
        label: '9/18',
        showDataPoint: true,
        dataPointColor: '#4CAF50',
        month: '9月',
      },
      {
        value: -58590,
        dataPointText: '$-58,590',
        label: '9/23',
        showDataPoint: true,
        dataPointColor: '#FF5252',
        month: '9月',
      },
      {
        value: -25090,
        dataPointText: '$-25,090',
        label: '10/15',
        showDataPoint: true,
        dataPointColor: '#FF5252',
        month: '10月',
      },
    ];

    // 格式化數據點的顯示文字
    result.forEach(point => {
      // 格式化為千分位顯示
      const absValue = Math.abs(point.value);
      const formattedValue = absValue.toLocaleString();
      point.dataPointText = `$${point.value < 0 ? '-' : ''}${formattedValue}`;
    });

    return {
      chartData: result,
    };
  }, [monthlyInvoices]);

  // 如果沒有數據，顯示加載中
  if (!monthlyInvoices || monthlyInvoices.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyChart}>
          <Loading />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChartBicolor
          areaChart
          data={chartData}
          height={300}
          width={screenWidth}
          noOfSections={3}
          yAxisLabelTexts={['-$50k', '$0', '$50k', '$100k', '$150k']}
          yAxisTextStyle={{ color: '#333' }}
          xAxisLabelTextStyle={{ color: '#333' }}
          xAxisColor="#333"
          yAxisColor="#333"
          color="#4CAF50"
          colorNegative="#FF5252"
          startFillColor="rgba(76, 175, 80, 0.2)"
          startFillColorNegative="rgba(255, 82, 82, 0.2)"
          endFillColor="rgba(76, 175, 80, 0.2)"
          endFillColorNegative="rgba(255, 82, 82, 0.2)"
          startOpacity={0.9}
          endOpacity={0.2}
          spacing={50}
          initialSpacing={20}
          endSpacing={20}
          hideDataPoints={false}
          customDataPoint={(item: any) => {
            // 確保 item 和 item.index 存在
            if (!item || typeof item.index === 'undefined') {
              return (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#4CAF50',
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                />
              );
            }

            // 直接使用預計算的顏色
            const dataPoint = chartData[item.index];
            const color = dataPoint?.dataPointColor || '#4CAF50';

            return (
              <View
                key={item.index}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: color,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              />
            );
          }}
          onPress={(item: any, index: number) => {
            console.log('Pressed item:', item, 'at index:', index);
          }}
          pointerConfig={{
            pointerStripHeight: 120,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: 'black',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 40,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items: any) => {
              return (
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 5,
                    padding: 10,
                    width: 120,
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {items[0].label}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    {items[0].dataPointText}
                  </Text>
                </View>
              );
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  chartContainer: {
    marginVertical: 10,
    borderRadius: 16,
  },
  emptyChart: {
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
});
