import { authApi } from '@/services/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

export interface UserData {
  id: string;
  email: string;
  name?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: UserData | null;
  userProfile: unknown | null;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (
    authUser: UserData | null,
    tokens?: { access_token?: string; refresh_token?: string }
  ) => void;
  setUserProfile: (profile: unknown) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 初始化時從 AsyncStorage 讀取認證資訊
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [userStr, profileStr, accessToken, refreshToken] =
          await Promise.all([
            AsyncStorage.getItem('auth_user'),
            AsyncStorage.getItem('user_profile'),
            AsyncStorage.getItem('access_token'),
            AsyncStorage.getItem('refresh_token'),
          ]);

        if (userStr) setUser(JSON.parse(userStr));
        if (profileStr) setUserProfile(JSON.parse(profileStr));
        if (accessToken) setAccessToken(accessToken);
        if (refreshToken) setRefreshToken(refreshToken);

        // 這裡可以添加驗證 token 有效性的 API 調用
        // 例如: await validateToken(accessToken);
      } catch (error) {
        console.error('Failed to load auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // 設置認證資訊
  const setAuth = async (
    authUser: UserData | null,
    tokens?: { access_token?: string; refresh_token?: string }
  ) => {
    try {
      if (authUser) {
        await AsyncStorage.setItem('auth_user', JSON.stringify(authUser));
        setUser(authUser);

        if (tokens?.access_token) {
          await AsyncStorage.setItem('access_token', tokens.access_token);
          setAccessToken(tokens.access_token);
        }

        if (tokens?.refresh_token) {
          await AsyncStorage.setItem('refresh_token', tokens.refresh_token);
          setRefreshToken(tokens.refresh_token);
        }
      } else {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        await AsyncStorage.removeItem('auth_user');
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
      }
    } catch (error) {
      console.error('Failed to set auth data:', error);
    }
  };

  // 設置用戶資料
  const setUserProfileData = async (profile: unknown) => {
    try {
      if (profile) {
        await AsyncStorage.setItem('user_profile', JSON.stringify(profile));
        setUserProfile(profile);
      } else {
        setUserProfile(null);
        await AsyncStorage.removeItem('user_profile');
      }
    } catch (error) {
      console.error('Failed to set user profile:', error);
    }
  };

  // 登出
  const logout = async () => {
    try {
      await authApi.logout();
      await setAuth(null);
      await setUserProfileData(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isLoading,
        accessToken,
        refreshToken,
        setAuth,
        setUserProfile: setUserProfileData,
        logout,
        isAuthenticated: !!user && !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
