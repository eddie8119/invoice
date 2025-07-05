import request from '@/lib/request';
import type { ApiResponse } from '@/types/api';
import type { InvoiceType } from '@/types/invoice';

interface GetInvoicesParams {
  type: InvoiceType;
  month?: string; // 格式: YYYY-MM
}

export const invoiceApi = {
  // 獲取發票列表
  getInvoices: async (params: GetInvoicesParams): Promise<ApiResponse> => {
    return request.get('/invoices', { params });
  },

  // 獲取單個發票
  getInvoice: async (id: string): Promise<ApiResponse> => {
    return request.get(`/invoices/${id}`);
  },

  // 創建發票
  createInvoice: async (data: any): Promise<ApiResponse> => {
    return request.post('/invoices', data);
  },

  // 更新發票
  updateInvoice: async (id: string, data: any): Promise<ApiResponse> => {
    return request.put(`/invoices/${id}`, data);
  },

  // 刪除發票
  deleteInvoice: async (id: string): Promise<ApiResponse> => {
    return request.delete(`/invoices/${id}`);
  },
};
