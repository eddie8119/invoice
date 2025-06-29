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
    async get<T>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
      try {
        const response = await instance.get(url, config);
        return response.data;
      } catch (error) {
        return handleError<T>(error);
      }
    },
    async post<T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
      try {
        const response = await instance.post(url, data, config);
        return response.data;
      } catch (error) {
        return handleError<T>(error);
      }
    },
    async put<T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
      try {
        const response = await instance.put(url, data, config);
        return response.data;
      } catch (error) {
        return handleError<T>(error);
      }
    },
    async delete<T>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
      try {
        const response = await instance.delete(url, config);
        return response.data;
      } catch (error) {
        return handleError<T>(error);
      }
    },
  };
}

export const apiClient = createApi(request);
