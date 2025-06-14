export interface Invoice {
  id: string;
  company: string;
  amount: string;
  createdAt: Date;
  paidAt: Date | null;
  expectPaidAt: Date | null;
  status: 'paid' | 'unpaid' | 'overdue';
  invoiceNumber: string;
}

// 交易項目類型定義
export interface Transaction {
  id: string;
  company: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
}
