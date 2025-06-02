import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/types/api';
import { LoginSchema } from '../../../shared/schemas/loginSchema';
import { RegisterSchema } from '../../../shared/schemas/registerSchema';

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
