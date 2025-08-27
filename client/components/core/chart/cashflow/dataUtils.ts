import { CashFlowData } from '@/types/chart';

/**
 * Processes monthly invoices data to generate cash flow chart data
 */
export const processCashFlowData = (
  monthlyInvoices: any[] = []
): CashFlowData => {
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
    const monthName = new Date(year, monthIndex, 1).toLocaleString('default', {
      month: 'short',
    });
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
  allInvoices.forEach(invoice => {
    const dueDate = new Date(invoice.dueDate);
    const month = dueDate.getMonth() + 1; // 月份（1-12）
    const day = dueDate.getDate();
    const dateStr = `${month}/${day}`;

    // 計算在三個月內的相對位置
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
        label: `$${currentCashLevel.toLocaleString()}`,
        dateStr: dateStr,
      });
    }
  });

  // 確保三個月都有數據點
  ensureMonthlyDataPoints(chartPoints, currentMonth, currentYear, threeMonths);

  return {
    dailyCashFlow: {
      dates: dateLabels,
      levels: dailyCashLevels,
    },
    threeMonthLabels: threeMonths,
    monthlyDataPoints: chartPoints,
  };
};

/**
 * Ensures that all three months have at least one data point
 */
const ensureMonthlyDataPoints = (
  chartPoints: ChartPoint[],
  currentMonth: number,
  currentYear: number,
  threeMonths: string[]
) => {
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
};

/**
 * Prepares chart data for Victory components
 */
export const prepareChartData = (
  monthlyDataPoints: ChartPoint[]
): ChartDataPoint[] => {
  // 將數據點排序
  const sortedPoints = [...monthlyDataPoints];
  sortedPoints.sort((a, b) => a.x - b.x);

  // 轉換為圖表所需的格式
  return sortedPoints.map(point => ({
    x: point.x,
    y: point.y,
    label: point.label,
    date: point.dateStr,
  }));
};

/**
 * Filters chart data for positive values (y >= 0)
 */
export const filterPositiveData = (
  chartData: ChartDataPoint[]
): ChartDataPoint[] => {
  return chartData.filter((point, index, array) => {
    // 只保留y值大於0的點，以及與它們相連的點
    if (point.y >= 0) return true;

    // 如果當前點小於0，但前一個點大於0，保留這個點以連接線段
    const prevPoint = index > 0 ? array[index - 1] : null;
    if (prevPoint && prevPoint.y >= 0) return true;

    // 如果當前點小於0，但後一個點大於0，保留這個點以連接線段
    const nextPoint = index < array.length - 1 ? array[index + 1] : null;
    if (nextPoint && nextPoint.y >= 0) return true;

    return false;
  });
};

/**
 * Filters chart data for negative values (y < 0)
 */
export const filterNegativeData = (
  chartData: ChartDataPoint[]
): ChartDataPoint[] => {
  return chartData.filter((point, index, array) => {
    // 只保留y值小於0的點，以及與它們相連的點
    if (point.y < 0) return true;

    // 如果當前點大於等於0，但前一個點小於0，保留這個點以連接線段
    const prevPoint = index > 0 ? array[index - 1] : null;
    if (prevPoint && prevPoint.y < 0) return true;

    // 如果當前點大於等於0，但後一個點小於0，保留這個點以連接線段
    const nextPoint = index < array.length - 1 ? array[index + 1] : null;
    if (nextPoint && nextPoint.y < 0) return true;

    return false;
  });
};
