import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="sign-up" />
      </Stack>
    </SafeAreaView>
  );
}
