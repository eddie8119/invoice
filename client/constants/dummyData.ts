import { Transaction } from '@/types/invoice';

export const mockInvoicesReceivable = [
  {
    id: '1',
    company: {
      id: '1182be27-cb6b-4ecb-99da-61890fba520c',
      name: '環球科技有限公司',
    },
    totalAmount: '582.70',
    createdAt: new Date('2025-07-05'),
    paidAt: null,
    dueDate: null,
    status: 'unpaid' as const,
    invoiceNumber: 'INV100001',
    type: 'receivable',
  },
  {
    id: '2',
    company: {
      id: '1182be27-cb6b-4ecb-99da-61890fba520c',
      name: 'a科技有限公司',
    },
    totalAmount: '582.01',
    createdAt: new Date('2025-07-05'),
    paidAt: null,
    dueDate: null,
    status: 'overdue' as const,
    invoiceNumber: 'INV100002',
    type: 'receivable',
  },
  {
    id: '3',
    company: {
      id: '1182be27-cb6b-4ecb-99da-61890fba520c',
      name: 'b科技有限公司',
    },
    totalAmount: '582.23',
    createdAt: new Date('2025-07-05'),
    paidAt: new Date('2025-07-08'),
    dueDate: null,
    status: 'paid' as const,
    invoiceNumber: 'INV100003',
    type: 'receivable',
  },
  {
    id: '4',
    company: {
      id: '1182be27-cb6b-4ecb-99da-61890fba520c',
      name: '陳小華有限公司',
    },
    totalAmount: '582.70',
    createdAt: new Date('2025-07-04'),
    paidAt: null,
    dueDate: new Date('2025-07-13'),
    status: 'unpaid' as const,
    invoiceNumber: 'INV100004',
  },
];

export const mockInvoicesPayable = [
  {
    id: '3',
    company: {
      id: '1182be27-cb6b-4ecb-99da-61890fba520c',
      name: '王華科技有限公司',
    },
    totalAmount: '582.23',
    createdAt: new Date('2025-07-05'),
    paidAt: new Date('2025-07-08'),
    dueDate: null,
    status: 'paid' as const,
    invoiceNumber: 'INV100003',
  },
  {
    id: '1',
    company: {
      id: '1182be27-cb6b-4ecb-99da-61890fba520c',
      name: '李煥貿易有限公司',
    },
    totalAmount: '582.70',
    createdAt: new Date('2025-07-05'),
    paidAt: null,
    dueDate: null,
    status: 'unpaid' as const,
    invoiceNumber: 'INV100001',
  },
  {
    id: '4',
    company: {
      id: '1182be27-cb6b-4ecb-99da-61890fba520c',
      name: '陳小華有限公司',
    },
    totalAmount: '582.70',
    createdAt: new Date('2025-07-04'),
    paidAt: null,
    dueDate: new Date('2025-07-13'),
    status: 'unpaid' as const,
    invoiceNumber: 'INV100004',
  },
  {
    id: '2',
    company: {
      id: '1182be27-cb6b-4ecb-99da-61890fba520c',
      name: '環球科技有限公司',
    },
    totalAmount: '582.01',
    createdAt: new Date('2025-07-05'),
    paidAt: null,
    dueDate: null,
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
    totalAmount: 256.0,
    type: 'income',
  },
  {
    id: '2',
    company: '微科技有限公司',
    date: '18/27-6/28',
    totalAmount: -406.0,
    type: 'expense',
  },
  {
    id: '3',
    company: '球科技有限公司',
    date: '18/27-6/28',
    totalAmount: 256.0,
    type: 'income',
  },
];
