import { useColorScheme } from '@/hooks/useColorScheme';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import './globals.css';

function RootGard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuth = false;
  const segments = useSegments();

  useEffect(() => {
    // const inAuthGroup = segments[0] === '(auth)';
    // if (!isAuth && !inAuthGroup) {
    //   // 使用 setTimeout 來確保導航在下一個事件循環中執行
    //   setTimeout(() => {
    //     router.replace('/(auth)/login');
    //   }, 0);
    // }
  }, [isAuth, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <RootGard>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </RootGard>
  );
}
