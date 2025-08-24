// Types for cash flow chart data
export interface ChartDataPoint {
  x: number;
  y: number;
  label: string;
  date: string;
}

export interface CashFlowData {
  dailyCashFlow: {
    dates: string[];
    levels: number[];
  };
  threeMonthLabels: string[];
  monthlyDataPoints: ChartPoint[];
}

export interface ChartPoint {
  date: Date;
  x: number;
  y: number;
  label: string;
  dateStr: string;
}

// 負現金流警示組件的 props 類型
export interface CashFlowWarningProps {
  negativeDates: string[];
}

// 圖表數據點類型 (用於 GiftedCharts)
export interface GiftedChartDataPoint {
  value: number; // 現金水位
  dataPointText: string; // 顯示的文字
  label: string; // 日期標籤
  showDataPoint: boolean; // 是否顯示數據點
  dataPointColor: string; // 數據點顏色
  month?: string; // 月份標籤
}
