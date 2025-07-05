export type InvoiceType = 'receivable' | 'payable';

export type InvoiceStatus = 'paid' | 'unpaid' | 'overdue';

export interface InvoiceResponse {
  id: string;
  invoice_number: string;
  due_date: Date;
  total_amount: number;
  currency: string;
  status: 'paid' | 'unpaid' | 'overdue';
  notes: string;
  created_at: Date;
  company: {
    id: string;
    name: string;
  };
  type: InvoiceType;
}

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
  title: string;
  quantity: number;
  unitPrice: number;
  id?: string;
}

export interface InvoiceFormData {
  company: string;
  invoiceNumber: string;
  note: string;
  paymentDueDate: string;
  type: InvoiceType;
  status: InvoiceStatus;
  items: InvoiceItem[];
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
