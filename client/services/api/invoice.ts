import request from '@/lib/request';
import { createInvoiceSchema } from '@/shared/schemas/createInvoice';
import type {
  GetInvoiceResponse,
  InvoiceDetail,
  InvoiceType,
  createInvoiceDetailResponse,
} from '@/types/invoice';
import type { ApiResponse } from '@/types/request';

interface GetInvoicesParams {
  type: InvoiceType;
  month?: string;
  year: string;
}

export const invoiceApi = {
  // 獲取發票列表
  getInvoices: async (
    params: GetInvoicesParams
  ): Promise<ApiResponse<GetInvoiceResponse[]>> => {
    return request.get('/invoices', { params });
  },

  // 獲取單個發票
  getInvoice: async (id: string): Promise<ApiResponse<InvoiceDetail>> => {
    return request.get(`/invoices/${id}`);
  },

  // 創建發票
  createInvoice: async (
    data: createInvoiceSchema
  ): Promise<ApiResponse<createInvoiceDetailResponse>> => {
    return request.post('/invoices', data);
  },

  // 更新發票
  updateInvoice: async (id: string, data: createInvoiceSchema) => {
    return request.put(`/invoices/${id}`, data);
  },

  // 刪除發票
  deleteInvoice: async (id: string) => {
    return request.delete(`/invoices/${id}`);
  },

  // 獲取指定數量的月度總額
  getMonthlyTotals: async (params: { monthsCount: number }) => {
    return request.get(`/monthly-totals`, {
      params,
    });
  },
};
