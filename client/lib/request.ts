import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { router } from 'expo-router';

const API_URL =
  Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL;

const request = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 創建一個專門用來刷新 token 的 axios 實例 post (不帶攔截器)
// 用 axios.post 刷新 token 可能會觸發循環依賴（
const refreshAxiosInstance = axios.create({
  baseURL: API_URL,
});

// 標記是否正在刷新 token
let isRefreshing = false;
// 存放等待中的請求
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 登出並清理
const logout = async () => {
  await AsyncStorage.multiRemove([
    'access_token',
    'refresh_token',
    'auth_user',
  ]);
  router.replace('/(auth)/login');
};

// 請求攔截器
request.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 響應攔截器
request.interceptors.response.use(
  response => {
    // 處理 token
    const accessToken = response.headers['access-token'];
    const refreshToken = response.headers['refresh-token'];

    if (accessToken) {
      AsyncStorage.setItem('access_token', accessToken);
    }

    if (refreshToken) {
      AsyncStorage.setItem('refresh_token', refreshToken);
    }

    // 返回標準化的 API 響應
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 未授權錯誤 (token 過期)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axios(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 嘗試使用 refresh token 獲取新的 access token
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        if (!refreshToken) {
          await logout();
          return Promise.reject(error);
        }

        // 調用刷新 token API
        const response = await refreshAxiosInstance.post(
          `${API_URL}/auth/refresh-token`,
          {
            refreshToken,
          }
        );
        const { success, data } = response.data;
        const { access_token, refresh_token: newRefreshToken } = data;

        if (success && access_token) {
          // 保存新的 tokens
          await AsyncStorage.setItem('access_token', access_token);
          await AsyncStorage.setItem('refresh_token', newRefreshToken);

          // 重試原始請求
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }
          processQueue(null, access_token);
          return axios(originalRequest);
        } else {
          throw new Error('Refresh token failed');
        }
      } catch (e) {
        processQueue(e, null);
        await logout();
        console.error('Token refresh failed, logging out:', e);
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    console.error('Response error:', error.response?.data);
    return Promise.reject(error.response?.data);
  }
);

export default request;
