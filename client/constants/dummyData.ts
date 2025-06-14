import { Transaction } from '@/types/invoice';

export const mockInvoicesReceivable = [
  {
    id: '1',
    company: '李煥貿易有限公司',
    amount: '582.70',
    createdAt: new Date('2025-06-05'),
    paidAt: null,
    expectPaidAt: null,
    status: 'unpaid' as const,
    invoiceNumber: 'INV100001',
  },
  {
    id: '2',
    company: '環球科技有限公司',
    amount: '582.01',
    createdAt: new Date('2025-06-05'),
    paidAt: null,
    expectPaidAt: null,
    status: 'overdue' as const,
    invoiceNumber: 'INV100002',
  },
  {
    id: '3',
    company: '王華科技有限公司',
    amount: '582.23',
    createdAt: new Date('2025-06-05'),
    paidAt: new Date('2025-06-8'),
    expectPaidAt: null,
    status: 'paid' as const,
    invoiceNumber: 'INV100003',
  },
  {
    id: '4',
    company: '陳小華有限公司',
    amount: '582.70',
    createdAt: new Date('2025-06-04'),
    paidAt: null,
    expectPaidAt: new Date('2025-06-13'),
    status: 'unpaid' as const,
    invoiceNumber: 'INV100004',
  },
];

export const mockInvoicesPayable = [
  {
    id: '3',
    company: '王華科技有限公司',
    amount: '582.23',
    createdAt: new Date('2025-06-05'),
    paidAt: new Date('2025-06-8'),
    expectPaidAt: null,
    status: 'paid' as const,
    invoiceNumber: 'INV100003',
  },
  {
    id: '1',
    company: '李煥貿易有限公司',
    amount: '582.70',
    createdAt: new Date('2025-06-05'),
    paidAt: null,
    expectPaidAt: null,
    status: 'unpaid' as const,
    invoiceNumber: 'INV100001',
  },
  {
    id: '4',
    company: '陳小華有限公司',
    amount: '582.70',
    createdAt: new Date('2025-06-04'),
    paidAt: null,
    expectPaidAt: new Date('2025-06-13'),
    status: 'unpaid' as const,
    invoiceNumber: 'INV100004',
  },
  {
    id: '2',
    company: '環球科技有限公司',
    amount: '582.01',
    createdAt: new Date('2025-06-05'),
    paidAt: null,
    expectPaidAt: null,
    status: 'overdue' as const,
    invoiceNumber: 'INV100002',
  },
];

// 近期交易數據
export const recentTransactions: Transaction[] = [
  {
    id: '1',
    company: '盛科技有限公司',
    date: '18/27-6/28',
    amount: 256.0,
    type: 'income',
  },
  {
    id: '2',
    company: '微科技有限公司',
    date: '18/27-6/28',
    amount: -406.0,
    type: 'expense',
  },
  {
    id: '3',
    company: '球科技有限公司',
    date: '18/27-6/28',
    amount: 256.0,
    type: 'income',
  },
];
