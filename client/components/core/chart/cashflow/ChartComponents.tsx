import React from 'react';
import {
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from 'victory';
import { ChartDataPoint } from './chart';

interface AxisProps {
  threeMonthLabels: string[];
}

/**
 * X-Axis component for the cash flow chart
 */
export const XAxis: React.FC<AxisProps> = ({ threeMonthLabels }) => {
  return (
    <VictoryAxis
      tickValues={[1, 2, 3]}
      tickFormat={threeMonthLabels}
      style={{
        tickLabels: { fontSize: 12, fontWeight: 'bold', fill: '#555' },
        grid: { stroke: '#ECECEC' },
        axis: { stroke: '#CCCCCC', strokeWidth: 1 },
      }}
    />
  );
};

/**
 * Y-Axis component for the cash flow chart
 */
export const YAxis: React.FC = () => {
  return (
    <VictoryAxis
      dependentAxis
      tickFormat={(t: number) => `$${(t / 1000).toFixed(0)}k`}
      style={{
        tickLabels: { fontSize: 11, fill: '#555' },
        grid: { stroke: '#ECECEC', strokeDasharray: '5,5' },
        axis: { stroke: '#CCCCCC', strokeWidth: 1 },
      }}
    />
  );
};

interface LineProps {
  data: ChartDataPoint[];
  color: string;
}

/**
 * Line component for the cash flow chart
 */
export const ChartLine: React.FC<LineProps> = ({ data, color }) => {
  return (
    <VictoryLine
      data={data}
      x="x"
      y="y"
      style={{
        data: { stroke: color, strokeWidth: 3 },
      }}
      interpolation="linear"
    />
  );
};

interface ScatterProps {
  data: ChartDataPoint[];
}

/**
 * Scatter points with tooltips for the cash flow chart
 */
export const DataPoints: React.FC<ScatterProps> = ({ data }) => {
  return (
    <VictoryScatter
      data={data}
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
  );
};
