export type InvoiceType = 'receivable' | 'payable';

export type InvoiceStatus = 'paid' | 'unpaid' | 'overdue';

export interface GetInvoiceResponse {
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

export interface createInvoiceDetailResponse {
  id: number;
  invoiceNumber: string;
  dueDate: string;
  totalAmount: number;
  status: string;
  notes: string;
  type: string;
  company: {
    id: number;
    name: string;
  };
  items: Array<{
    id: number;
    invoiceId: number;
    title: string;
    quantity: number;
    unitPrice: number;
  }>;
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
  dueDate: string;
  type: InvoiceType;
  status: InvoiceStatus;
  invoiceItems: InvoiceItem[];
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
  invoiceItems: InvoiceItem[];
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
