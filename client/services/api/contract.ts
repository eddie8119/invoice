import axiosInstance from '@/lib/request';
import { ContractDTO } from '@/types/contract';
import { ApiResponse } from '@/types/request';

export const contractApi = {
  getContracts: async (): Promise<ApiResponse<ContractDTO[]>> => {
    return axiosInstance.get('/contracts');
  },
  getContract: async (id: string): Promise<ApiResponse<ContractDTO>> => {
    return axiosInstance.get(`/contracts/${id}`);
  },
  updateContract: async (data: any): Promise<ApiResponse<ContractDTO>> => {
    return axiosInstance.put('/contracts', data);
  },
  createContract: async (data: any): Promise<ApiResponse<ContractDTO>> => {
    return axiosInstance.post('/contracts', data);
  },
};
