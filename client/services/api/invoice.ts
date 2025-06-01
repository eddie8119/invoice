import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/types/api';

export const invoiceApi = {
  // 獲取發票列表
  getInvoices: async (params?: any): Promise<ApiResponse> => {
    return axiosInstance.get('/invoices', { params });
  },

  // 獲取單個發票
  getInvoice: async (id: string): Promise<ApiResponse> => {
    return axiosInstance.get(`/invoices/${id}`);
  },

  // 創建發票
  createInvoice: async (data: any): Promise<ApiResponse> => {
    return axiosInstance.post('/invoices', data);
  },

  // 更新發票
  updateInvoice: async (id: string, data: any): Promise<ApiResponse> => {
    return axiosInstance.put(`/invoices/${id}`, data);
  },

  // 刪除發票
  deleteInvoice: async (id: string): Promise<ApiResponse> => {
    return axiosInstance.delete(`/invoices/${id}`);
  },
};
