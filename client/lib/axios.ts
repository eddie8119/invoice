import axios from 'axios';
import Constants from 'expo-constants';

const API_URL =
  Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 請求攔截器
axiosInstance.interceptors.request.use(
  config => {
    // 從 AsyncStorage 獲取 token
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 響應攔截器
axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
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

export default axiosInstance;
