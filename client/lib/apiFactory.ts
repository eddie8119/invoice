import { ApiResponse } from '@/types/request';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import request from './request';

export function createApi(instance: AxiosInstance) {
  function handleError<T>(error: unknown): ApiResponse<T> {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<T>>;
      if (axiosError.response?.data) {
        return axiosError.response.data as ApiResponse<T>;
      }
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  return {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      try {
        const response = await instance.get<T>(url, config);
        return response.data;
      } catch (error) {
        throw new Error(handleError(error).message);
      }
    },
    async post<T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T> {
      try {
        const response = await instance.post<T>(url, data, config);
        return response.data;
      } catch (error) {
        throw new Error(handleError(error).message);
      }
    },
    async put<T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T> {
      try {
        const response = await instance.put<T>(url, data, config);
        return response.data;
      } catch (error) {
        throw new Error(handleError(error).message);
      }
    },
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      try {
        const response = await instance.delete<T>(url, config);
        return response.data;
      } catch (error) {
        throw new Error(handleError(error).message);
      }
    },
  };
}

export const apiClient = createApi(request);
