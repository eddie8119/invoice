import { theme } from '@/constants/theme';

export type InvoiceStatus = 'paid' | 'unpaid' | 'overdue';

export function getStatusColor(status: InvoiceStatus): string {
  const colors = theme.colors.light;
  switch (status) {
    case 'paid':
      return colors.success;
    case 'unpaid':
      return colors.primaryOceanBlue;
    case 'overdue':
      return colors.error;
    default:
      return colors.text;
  }
}

export function getStatusText(status: InvoiceStatus): string {
  switch (status) {
    case 'paid':
      return '已付';
    case 'unpaid':
      return '未付';
    case 'overdue':
      return '逾期';
    default:
      return '';
  }
}
