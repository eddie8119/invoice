import axiosInstance from '@/lib/request';
import { ApiResponse } from '@/types/request';
import { User } from '@/types/user';

export const userApi = {
  // 獲取用戶資料
  getProfile: async (): Promise<ApiResponse<User>> => {
    return axiosInstance.get('/user/profile');
  },

  // 更新用戶資料
  updateProfile: async (data: any): Promise<ApiResponse<User>> => {
    return axiosInstance.put('/user/profile', data);
  },
};
