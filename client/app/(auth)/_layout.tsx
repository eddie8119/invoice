import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  const colors = Colors.light;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="welcome"
        options={{
          title: 'Welcome',
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: 'Sign Up',
        }}
      />
    </Stack>
  );
}
