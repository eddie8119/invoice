import axiosInstance from '@/lib/request';
import { CompanyDTO } from '@/types/company';
import { ApiResponse } from '@/types/request';

export const companyApi = {
  // 獲取用戶資料
  getCompanies: async (): Promise<ApiResponse<CompanyDTO[]>> => {
    return axiosInstance.get('/companies');
  },

  // 更新用戶資料
  updateCompany: async (data: any): Promise<ApiResponse<CompanyDTO>> => {
    return axiosInstance.put('/companies', data);
  },
};
