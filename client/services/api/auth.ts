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
  register: (data: RegisterSchema): Promise<ApiResponse<AuthResponse>> => {
    return request.post('/auth/register', data);
  },
  login: (data: LoginSchema): Promise<ApiResponse<AuthResponse>> => {
    return request.post('/auth/login', data);
  },
  logout: (): Promise<ApiResponse<AuthResponse>> => {
    return request.post('/auth/logout');
  },
  getCurrentUser: (): Promise<ApiResponse<AuthResponse>> => {
    return request.get('/auth/me');
  },

  // 刷新 token
  refreshToken: (
    refreshToken: string
  ): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> => {
    return request.post<{ accessToken: string; refreshToken: string }>(
      '/auth/refresh-token',
      { refreshToken }
    );
  },
};
