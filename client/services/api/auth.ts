import request from '@/lib/request';
import { LoginSchema } from '@/lib/schemas/loginSchema';
import { RegisterSchema } from '@/lib/schemas/registerSchema';
import { ApiResponse } from '@/types/api';

export const authApi = {
  register: (data: RegisterSchema): Promise<ApiResponse> => {
    return request.post('/auth/register', data);
  },
  login: (data: LoginSchema): Promise<ApiResponse> => {
    return request.post('/auth/login', data);
  },
  logout: (): Promise<ApiResponse> => {
    return request.post('/auth/logout');
  },
  getCurrentUser: (): Promise<ApiResponse> => {
    return request.get('/auth/me');
  },
};
