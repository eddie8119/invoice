import Loading from '@/components/core/Loading';
import { useMonthlyInvoices } from '@/hooks/useMonthlyInvoices';
import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';

export const CashFlowChart = () => {
  const screenWidth = Dimensions.get('window').width - 32; // 左右各留16的padding

  const { monthlyInvoices } = useMonthlyInvoices();

  // 從 monthlyInvoices 計算現金流數據
  const { dailyCashFlow, threeMonthLabels, monthlyDataPoints } = useMemo(() => {
    // 定義數據點的類型
    interface DataPoint {
      x: number;
      y: number;
      label: string;
      date: string;
    }

    // 定義月份數據的類型
    interface MonthlyPoints {
      [key: number]: DataPoint[];
    }

    // 生成三個月的標籤（當前月份開始的三個月）
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // 創建月份範圍的開始和結束日期
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 3, 0); // 三個月後的最後一天
    const totalDays =
      Math.floor(
        (monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

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

    // 初始現金水位設為20000
    const initialCashLevel = 20000;
    let currentCashLevel = initialCashLevel;

    // 創建起始點
    const dateLabels: string[] = ['現在'];
    const dailyCashLevels: number[] = [initialCashLevel];

    // 收集所有發票並按到期日排序
    const allInvoices = monthlyInvoices.flatMap(month => month.invoices);
    allInvoices.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    // 創建時間軸上的所有數據點
    interface ChartPoint {
      date: Date;
      x: number;
      y: number;
      label: string;
      dateStr: string;
    }

    const chartPoints: ChartPoint[] = [];

    // 加入起始點 - 設定為當前日期
    const startDate = new Date();
    chartPoints.push({
      date: startDate,
      x: 1, // 起始位置固定在 x=1
      y: initialCashLevel,
      label: `$${initialCashLevel.toLocaleString()}`,
      dateStr: '現在',
    });

    // 將所有發票依照到期日計算現金水位
    // 例如：2025-08-17的為 付款 2059元，2025-08-20的為 收入 10000元，2025-08-17的為 付款 2000元
    // 計算方式為 initialCashLevel -2059 +10000 -2000
    allInvoices.forEach(invoice => {
      const dueDate = new Date(invoice.dueDate);
      const month = dueDate.getMonth() + 1; // 月份（1-12）
      const day = dueDate.getDate();
      const dateStr = `${month}/${day}`;

      // 計算在三個月內的相對位置
      // 將日期轉換為相對的x座標位置
      // 使用實際日期計算相對位置，而不是依照月份分組
      const totalTimeSpan = monthEnd.getTime() - monthStart.getTime();
      const dueDateTimeSpan = dueDate.getTime() - monthStart.getTime();
      // 確保日期在合理範圍內
      if (dueDateTimeSpan >= 0 && dueDateTimeSpan <= totalTimeSpan) {
        // 計算相對位置，結果在 1-3 之間
        const relativePosition = (dueDateTimeSpan / totalTimeSpan) * 2 + 1;

        // 應收發票增加現金水位，應付發票減少現金水位
        const amount =
          invoice.type === 'receivable'
            ? invoice.totalAmount
            : -invoice.totalAmount;
        currentCashLevel += amount;

        // 儲存日期和對應的現金水位
        dateLabels.push(dateStr);
        dailyCashLevels.push(currentCashLevel);

        // 將點加入到圖表數據中，使用準確的相對位置
        chartPoints.push({
          date: dueDate,
          x: relativePosition,
          y: currentCashLevel,
          label: `$${currentCashLevel.toLocaleString()} (${invoice.type === 'receivable' ? '+' : '-'}$${Math.abs(amount).toLocaleString()})`,
          dateStr: dateStr,
        });
      }
    });

    // 確保三個月都有數據點
    // 如果沒有點落在第二或第三個月，則添加一個點
    const monthPositions = [1, 2, 3];
    monthPositions.forEach(monthPosition => {
      // 計算每個月的中間點位置
      const middleOfMonth = monthPosition;

      // 檢查是否已經有點接近這個月位置
      const hasPointNearMonth = chartPoints.some(
        point => Math.abs(point.x - middleOfMonth) < 0.5
      );

      if (!hasPointNearMonth) {
        // 如果沒有點，則使用前一個點的現金水位
        const lastPoint = chartPoints[chartPoints.length - 1];
        if (lastPoint) {
          const monthDate = new Date(
            currentYear,
            currentMonth + monthPosition - 1,
            15
          );
          chartPoints.push({
            date: monthDate,
            x: middleOfMonth,
            y: lastPoint.y,
            label: lastPoint.label,
            dateStr: threeMonths[monthPosition - 1],
          });
        }
      }
    });

    return {
      dailyCashFlow: {
        dates: dateLabels,
        levels: dailyCashLevels,
      },
      threeMonthLabels: threeMonths,
      monthlyDataPoints: chartPoints,
    };
  }, [monthlyInvoices]);

  // 為 Victory 圖表準備數據
  const chartData = useMemo(() => {
    // 定義數據點的類型
    interface DataPoint {
      x: number;
      y: number;
      label: string;
      dateStr: string;
    }

    // 將數據點排序
    const sortedPoints = [...monthlyDataPoints];
    sortedPoints.sort((a, b) => a.x - b.x);

    // 轉換為圖表所需的格式
    const chartPoints = sortedPoints.map(point => ({
      x: point.x,
      y: point.y,
      label: point.label,
      date: point.dateStr,
    }));

    return chartPoints;
  }, [monthlyDataPoints]);

  // 檢查是否有數據
  if (!chartData || chartData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>現金水位預測</Text>
        <View style={styles.emptyChart}>
          <Loading />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>現金水位預測</Text>

      <VictoryChart
        width={screenWidth}
        height={240}
        theme={VictoryTheme.material}
        domainPadding={{ y: 25 }}
        domain={{ x: [0.8, 3.2] }} // 設定 x 軸範圍為三個月，並移除左側空白
        padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
      >
        <VictoryAxis
          tickValues={[1, 2, 3]}
          tickFormat={threeMonthLabels}
          style={{
            tickLabels: { fontSize: 12, fontWeight: 'bold', fill: '#555' },
            grid: { stroke: '#ECECEC' },
            axis: { stroke: '#CCCCCC', strokeWidth: 1 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(t: number) => `$${(t / 1000).toFixed(0)}k`}
          style={{
            tickLabels: { fontSize: 11, fill: '#555' },
            grid: { stroke: '#ECECEC', strokeDasharray: '5,5' },
            axis: { stroke: '#CCCCCC', strokeWidth: 1 },
          }}
        />

        {/* 現金水位線 */}
        <VictoryLine
          data={chartData}
          x="x"
          y="y"
          style={{
            data: { stroke: '#00C896', strokeWidth: 3 },
          }}
          interpolation="monotoneX"
        />
        <VictoryScatter
          data={chartData}
          x="x"
          y="y"
          size={6}
          style={{
            data: { fill: '#00C896', stroke: 'white', strokeWidth: 1 },
          }}
          labels={({ datum }) => datum.label}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{
                fill: 'white',
                stroke: '#DDDDDD',
                strokeWidth: 1,
                filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.2))',
              }}
              style={{ fontSize: 11, fill: '#333' }}
              cornerRadius={4}
              pointerLength={8}
              flyoutPadding={{ top: 6, bottom: 6, left: 10, right: 10 }}
              renderInPortal={true}
            />
          }
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
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
