import { ButtonText } from '@/components/core/ButtonText';
import { Input } from '@/components/core/Input';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/services/api/auth';
import { createFormStyles } from '@/style/layouts/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, registerSchema } from '@shared/schemas/registerSchema';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function SignUpScreen() {
  const { setAuth } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { colors } = useTheme();
  const formStyles = createFormStyles(colors);

  const onSubmit = handleSubmit(async (data: RegisterSchema) => {
    try {
      const {
        data: apiResponseData,
        message,
        success,
      } = await authApi.register(data);

      if (success && apiResponseData) {
        const { user, access_token, refresh_token } = apiResponseData;

        setAuth(user, {
          access_token,
          refresh_token,
        });

        router.replace('/');
      } else {
        // 可以用一個 toast 或 alert 來顯示錯誤訊息
        console.error('Registration failed:', message || 'Unknown error');
      }
    } catch (error) {
      console.error('Register error:', error);
    }
  });

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start creating professional invoices in minutes"
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/login"
    >
      <View style={formStyles.inputContainer}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Name"
              placeholder="Enter your name"
              value={value}
              onChangeText={onChange}
              error={errors.name?.message}
              keyboardType="default"
              autoCapitalize="none"
              autoComplete="name"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email"
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Password"
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
              isPassword
              autoCapitalize="none"
              autoComplete="password"
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={value}
              onChangeText={onChange}
              error={errors.confirmPassword?.message}
              isPassword
              autoCapitalize="none"
              autoComplete="password"
            />
          )}
        />

        <ButtonText
          style={formStyles.submitButton}
          text="Create Account"
          variant="filled"
          size="medium"
          disabled={!isValid}
          onPress={onSubmit}
        />
      </View>
    </AuthLayout>
  );
}
