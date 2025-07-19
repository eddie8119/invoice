import { ButtonText } from '@/components/core/ButtonText';
import { Input } from '@/components/core/Input';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/services/api/auth';
import { formStyles } from '@/style/layouts/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@shared/schemas/loginSchema';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

export default function LoginScreen() {
  const { setAuth } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (data: LoginSchema) => {
    try {
      const {
        data: apiResponseData,
        message,
        success,
      } = await authApi.login(data);

      if (success && apiResponseData) {
        const { user, access_token, refresh_token } = apiResponseData;

        setAuth(user, {
          access_token,
          refresh_token,
        });

        router.replace('/');
      } else {
        console.error('Login failed:', message || 'Unknown error');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  });

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue creating invoices"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/sign-up"
    >
      <View style={formStyles.inputContainer}>
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

        <ButtonText
          style={formStyles.submitButton}
          text="Sign In"
          variant="filled"
          size="medium"
          disabled={!isValid}
          onPress={onSubmit}
        />
      </View>
    </AuthLayout>
  );
}
