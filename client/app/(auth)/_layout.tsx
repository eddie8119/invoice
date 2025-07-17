import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
const { colors } = useTheme();

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: styles.content,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
  },
});
