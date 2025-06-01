import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/types/api';

export const userApi = {
  // 獲取用戶資料
  getProfile: async (): Promise<ApiResponse> => {
    return axiosInstance.get('/user/profile');
  },

  // 更新用戶資料
  updateProfile: async (data: any): Promise<ApiResponse> => {
    return axiosInstance.put('/user/profile', data);
  },
};
