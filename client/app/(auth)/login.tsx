import { ButtonText } from '@/components/core/ButtonText';
import { Input } from '@/components/core/Input';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@shared/schemas/loginSchema';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

export default function LoginScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(data => {
    console.log('Form data:', data);
    // TODO: 實現登入選擇
  });

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue creating invoices"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/sign-up"
    >
      <View style={{ gap: 12 }}>
        <Input
          label="Email"
          placeholder="Enter your email"
          error={errors.email?.message}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          {...register('email')}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          isPassword
          autoCapitalize="none"
          autoComplete="password"
          {...register('password')}
        />

        <ButtonText
          text="Sign In"
          variant="filled"
          size="medium"
          onPress={onSubmit}
        />
      </View>
    </AuthLayout>
  );
}
