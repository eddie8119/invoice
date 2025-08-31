import { CHART_COLORS } from '@/constants/color';
import {
  LegendItem,
  PieChartDataResult,
  ShowPayableReceivableType,
} from '@/types/chart';

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  dueDate: string;
  totalAmount: number;
  status: string;
  caseId: string;
  paidAt: string | null;
  type: 'payable' | 'receivable';
  company?: {
    id: string;
    name: string;
  };
}

export function processInvoiceData(
  data: InvoiceData[] | undefined,
  chartType: ShowPayableReceivableType
): PieChartDataResult {
  // If no data, return empty result
  if (!data || data.length === 0) {
    return {
      pieData: [],
      totalReceivable: 0,
      totalPayable: 0,
      colorScale: [],
      invoiceIdMap: {},
    };
  }

  // Calculate totals by type
  let totalReceivable = 0;
  let totalPayable = 0;

  // Group invoices by company and type for more detailed visualization
  const invoicesByCompany: Record<string, { amount: number; type: string }> =
    {};

  // Create a map to store invoice IDs by company name and type
  const invoiceIdMap: Record<string, string> = {};

  // Process each invoice
  data.forEach(invoice => {
    const companyName = invoice.company?.name;
    const companyKey = `${companyName}-${invoice.type}`;

    if (!invoicesByCompany[companyKey]) {
      invoicesByCompany[companyKey] = {
        amount: 0,
        type: invoice.type,
      };
      // Store the first invoice ID for each company-type combination
      invoiceIdMap[companyKey] = invoice.id;
    }

    invoicesByCompany[companyKey].amount += invoice.totalAmount;

    if (invoice.type === 'receivable') {
      totalReceivable += invoice.totalAmount;
    } else {
      totalPayable += invoice.totalAmount;
    }
  });

  // Create pie chart data
  let pieData: Array<{
    x: string;
    y: number;
    color: string;
    label: string;
  }> = [];
  let colorScale: string[] = [];

  if (chartType === 'mixed') {
    // For mixed type, show receivable vs payable
    pieData = [
      {
        x: '應收',
        y: totalReceivable,
        color: CHART_COLORS.receivable,
        label: `應收: $${totalReceivable.toLocaleString()}`,
      },
      {
        x: '應付',
        y: totalPayable,
        color: CHART_COLORS.payable,
        label: `應付: $${totalPayable.toLocaleString()}`,
      },
    ];
    colorScale = [CHART_COLORS.receivable, CHART_COLORS.payable];
  } else {
    // For single type (payable or receivable), show breakdown by company
    const companyEntries = Object.entries(invoicesByCompany);
    const selectedShades =
      chartType === 'receivable'
        ? CHART_COLORS.greenShades
        : CHART_COLORS.blueShades;

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

  return { pieData, totalReceivable, totalPayable, colorScale, invoiceIdMap };
}

/**
 * Generate legend data based on chart data
 */
export function generateLegendData(
  chartType: ShowPayableReceivableType,
  totalReceivable: number,
  totalPayable: number,
  pieData: Array<{
    x: string;
    y: number;
    color: string;
    label: string;
  }>,
  invoiceIdMap: Record<string, string>
): LegendItem[] {
  if (chartType === 'mixed') {
    return [
      {
        name: `應收: $${totalReceivable.toLocaleString()}`,
        symbol: { fill: CHART_COLORS.receivable },
        value: totalReceivable,
      },
      {
        name: `應付: $${totalPayable.toLocaleString()}`,
        symbol: { fill: CHART_COLORS.payable },
        value: totalPayable,
      },
    ];
  } else {
    // For company-specific items, find the corresponding invoice ID
    return (
      pieData
        .map(item => {
          // Create the key to look up in the invoiceIdMap
          const companyKey = `${item.x}-${chartType}`;
          return {
            name: `${item.x}: $${item.y.toLocaleString()}`,
            symbol: { fill: item.color },
            value: item.y,
            id: invoiceIdMap[companyKey],
          };
        })
        // Sort by amount (descending) and take top 5
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
    );
  }
}

/**
 * Get chart title based on chart type
 */
export function getChartTitle(
  chartType: ShowPayableReceivableType,
  defaultTitle: string
): string {
  if (chartType === 'receivable') {
    return '應收發票統計';
  } else if (chartType === 'payable') {
    return '應付發票統計';
  }
  return defaultTitle;
}

/**
 * Get total amount based on chart type
 */
export function getTotalAmount(
  chartType: ShowPayableReceivableType,
  totalReceivable: number,
  totalPayable: number
): number {
  if (chartType === 'receivable') {
    return totalReceivable;
  } else if (chartType === 'payable') {
    return totalPayable;
  }
  return totalReceivable + totalPayable;
}

/**
 * Get total label based on chart type
 */
export function getTotalLabel(chartType: ShowPayableReceivableType): string {
  if (chartType === 'mixed') {
    return '發票總額';
  } else if (chartType === 'receivable') {
    return '應收總額';
  }
  return '應付總額';
}
