import axiosInstance from '@/lib/axios';
import { LoginSchema } from '@/lib/schemas/loginSchema';
import { RegisterSchema } from '@/lib/schemas/registerSchema';
import { ApiResponse } from '@/types/api';

export const authApi = {
  // 註冊
  register: async (data: RegisterSchema): Promise<ApiResponse> => {
    return axiosInstance.post('/auth/register', data);
  },

  // 登入
  login: async (data: LoginSchema): Promise<ApiResponse> => {
    return axiosInstance.post('/auth/login', data);
  },

  // 登出
  logout: async (): Promise<ApiResponse> => {
    return axiosInstance.post('/auth/logout');
  },
};
