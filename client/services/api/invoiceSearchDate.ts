import axiosInstance from '@/lib/request';
import { InvoiceSearchDateDTO } from '@/types/invoiceSearchDate';
import { ApiResponse } from '@/types/request';

export const invoiceSearchDateApi = {
  getInvoiceSearchDate: async (): Promise<
    ApiResponse<InvoiceSearchDateDTO[]>
  > => {
    return axiosInstance.get('/invoice_search_date');
  },
  createInvoiceSearchDate: async (data: {
    startDate: Date;
    endDate: Date;
  }): Promise<ApiResponse<InvoiceSearchDateDTO>> => {
    return axiosInstance.post('/invoice_search_date', data);
  },
  updateInvoiceSearchDate: async (
    data: any
  ): Promise<ApiResponse<InvoiceSearchDateDTO>> => {
    return axiosInstance.put('/invoice_search_date', data);
  },
};
