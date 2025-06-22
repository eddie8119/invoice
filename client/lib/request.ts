import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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

// 請求攔截器
request.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
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
    const token = response.headers.authorization;
    if (token) {
      AsyncStorage.setItem('token', token);
    }
    return response.data;
  },
  async error => {
    if (error.response) {
      if (error.response.status === 401) {
        await AsyncStorage.removeItem('token');
        router.replace('/login');
        // 觸發路由跳轉，不會阻止後續的程式碼執行
      }
      // 伺服器回應錯誤
      console.error('Response error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // 請求發送失敗
      console.error('Request error:', error.request);
      return Promise.reject({ message: 'Network error' });
    } else {
      // 其他錯誤
      console.error('Error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default request;
