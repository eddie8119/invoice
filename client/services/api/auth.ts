import request from '@/lib/request';
import { LoginSchema } from '@/shared/schemas/loginSchema';
import { RegisterSchema } from '@/shared/schemas/registerSchema';

export interface AuthResponse {
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      createdAt: Date;
    };
    access_token: string;
    refresh_token: string;
  };
  message: string;
  success: boolean;
}

export const authApi = {
  register: (data: RegisterSchema): Promise<AuthResponse> => {
    return request.post('/auth/register', data);
  },
  login: (data: LoginSchema): Promise<AuthResponse> => {
    return request.post('/auth/login', data);
  },
  logout: (): Promise<void> => {
    return request.post('/auth/logout');
  },
  getCurrentUser: (): Promise<AuthResponse> => {
    return request.get('/auth/me');
  },

  // 刷新 token
  refreshToken: (
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    return request.post<{ accessToken: string; refreshToken: string }>(
      '/auth/refresh-token',
      { refreshToken }
    );
  },
};
