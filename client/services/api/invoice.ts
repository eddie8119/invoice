import request from '@/lib/request';
import { createInvoiceSchema } from '@/shared/schemas/createInvoice';
import type {
  GetInvoiceResponse,
  InvoiceType,
  createInvoiceDetailResponse,
} from '@/types/invoice';
import type { ApiResponse } from '@/types/request';

interface GetInvoicesParams {
  type: InvoiceType;
  month?: string;
  year?: string;
}

export const invoiceApi = {
  // 獲取發票列表
  getInvoices: async (
    params: GetInvoicesParams
  ): Promise<ApiResponse<GetInvoiceResponse[]>> => {
    return request.get('/invoices', { params });
  },

  // 獲取單個發票
  getInvoice: async (id: string): Promise<ApiResponse<GetInvoiceResponse>> => {
    return request.get(`/invoices/${id}`);
  },

  // 創建發票
  createInvoice: async (
    data: createInvoiceSchema
  ): Promise<ApiResponse<createInvoiceDetailResponse>> => {
    return request.post('/invoices', data);
  },

  // 更新發票
  updateInvoice: async (id: string, data: any) => {
    return request.put(`/invoices/${id}`, data);
  },

  // 刪除發票
  deleteInvoice: async (id: string) => {
    return request.delete(`/invoices/${id}`);
  },
};
