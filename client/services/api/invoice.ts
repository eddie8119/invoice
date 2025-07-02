import request from '@/lib/request';
import { ApiResponse } from '@/types/api';

export const invoiceApi = {
  // 獲取發票列表
  getInvoices: async (): Promise<ApiResponse> => {
    return request.get('/invoices');
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
