import request from '@/lib/request';
import { LoginSchema } from '@/shared/schemas/loginSchema';
import { RegisterSchema } from '@/shared/schemas/registerSchema';
import type { ApiResponse } from '@/types/request';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
  };
  access_token: string;
  refresh_token: string;
}

export const authApi = {
  register: async (
    data: RegisterSchema
  ): Promise<ApiResponse<AuthResponse>> => {
    return await request.post('/auth/register', data);
  },
  login: async (data: LoginSchema): Promise<ApiResponse<AuthResponse>> => {
    console.log(55, data);
    return await request.post('/auth/login', data);
  },
  logout: async (): Promise<ApiResponse<AuthResponse>> => {
    return await request.post('/auth/logout');
  },
  getCurrentUser: async (): Promise<ApiResponse<AuthResponse>> => {
    return await request.get('/auth/me');
  },

  // 刷新 token
  refreshToken: async (
    refreshToken: string
  ): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> => {
    return await request.post<{
      accessToken: string;
      refreshToken: string;
    }>('/auth/refresh-token', { refreshToken });
  },
};
