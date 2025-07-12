export type InvoiceType = 'receivable' | 'payable';
export type InvoiceStatus = 'paid' | 'unpaid' | 'overdue';
import { CompanyDTO } from './company';

export interface GetInvoiceResponse {
  id: string;
  invoice_number: string;
  due_date: Date;
  total_totalAmount: number;
  currency: string;
  status: InvoiceStatus;
  notes: string;
  created_at: Date;
  company: CompanyDTO;
  type: InvoiceType;
}

export interface createInvoiceDetailResponse {
  id: number;
  invoiceNumber: string;
  dueDate: Date;
  totalAmount: number;
  status: InvoiceStatus;
  notes: string;
  type: InvoiceType;
  company: CompanyDTO;
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
  company: CompanyDTO;
  totalAmount: number;
  createdAt: Date;
  paidAt: Date | null;
  dueDate: Date | null;
  status: InvoiceStatus;
  invoiceNumber: string;
}

export interface InvoiceItem {
  id: string;
  title: string;
  quantity: number;
  createdAt: Date;
  invoiceId: string;
  unitPrice: number;
}

export interface InvoiceFormData {
  company: string;
  invoiceNumber: string;
  note: string;
  dueDate: Date;
  type: InvoiceType;
  status: InvoiceStatus;
  invoiceItems: InvoiceItem[];
}

export interface InvoiceDetail {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  notes: string;
  totalAmount: number;
  dueDate: Date;
  type: InvoiceType;
  updatedAt: Date;
  createdAt: Date;
  companyId: string;
  paidAt: Date | null;
  company: CompanyDTO;
  items: InvoiceItem[];
}

// 交易項目類型定義
export interface Transaction {
  id: string;
  company: string;
  date: Date;
  totalAmount: number;
  type: 'income' | 'expense';
}
