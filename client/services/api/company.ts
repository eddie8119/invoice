import axiosInstance from '@/lib/request';
import { CompanyDTO } from '@/types/company';
import { ApiResponse } from '@/types/request';

export const companyApi = {
  getCompanies: async (): Promise<ApiResponse<CompanyDTO[]>> => {
    return axiosInstance.get('/companies');
  },
  getCompany: async (id: string): Promise<ApiResponse<CompanyDTO>> => {
    return axiosInstance.get(`/companies/${id}`);
  },
  updateCompany: async (data: any): Promise<ApiResponse<CompanyDTO>> => {
    return axiosInstance.put('/companies', data);
  },
};
