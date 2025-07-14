import { Transaction } from '@/types/invoice';

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
