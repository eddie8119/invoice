import Loading from '@/components/core/Loading';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { theme } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

// 整合 React Navigation 主題與我們的自訂主題
const AppLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...theme.colors.light,
    background: theme.colors.light.background,
    card: theme.colors.light.surface,
    text: theme.colors.light.text,
    border: theme.colors.light.border,
  },
};

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...theme.colors.dark,
    background: theme.colors.dark.background,
    card: theme.colors.dark.surface,
    text: theme.colors.dark.text,
    border: theme.colors.dark.border,
  },
};

function RootGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/');
    }
  }, [isAuthenticated, segments, isLoading]);

  if (isLoading) {
    // 直接使用 Loading 元件
    return <Loading />;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return <Loading />;
  }

  return (
    <AuthProvider>
      <RootGuard>
        <ThemeProvider
          value={colorScheme === 'dark' ? AppLightTheme : AppLightTheme}
        >
          <PaperProvider>
            <ModalProvider>
              <Slot />
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'light'} />
            </ModalProvider>
          </PaperProvider>
        </ThemeProvider>
      </RootGuard>
    </AuthProvider>
  );
}
