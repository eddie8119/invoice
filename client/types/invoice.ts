export type InvoiceType = 'receivable' | 'payable';

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

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceDetail {
  id: string;
  invoiceNumber: string;
  company: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  createdAt: Date;
  expectPaidAt: Date;
  paidAt?: Date;
  items: InvoiceItem[];
  note?: string;
}

// 交易項目類型定義
export interface Transaction {
  id: string;
  company: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
}
