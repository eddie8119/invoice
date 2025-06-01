import { Button } from '@/components/core/Button';
import { Input } from '@/components/core/Input';
import { Colors } from '@/constants/Colors';
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const colors = Colors.light;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(data => {
    console.log('Form data:', data);
    // TODO: 實現註冊邏輯
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Create your account
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Start creating professional invoices in minutes
        </Text>

        {/* Form */}
        <View style={styles.form}>
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

          <Button
            text="Create Account"
            variant="filled"
            size="medium"
            disabled={!isValid}
            onPress={onSubmit}
          />

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Already have an account?{' '}
            </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={[styles.link, { color: colors.primary }]}>
                  Log in
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  form: {
    gap: 12,
    marginTop: 32,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  loginText: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
  },
});
