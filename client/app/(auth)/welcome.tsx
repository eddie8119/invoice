import { Button } from '@/components/core/Button';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const colors = Colors.light;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Logo and Hero Image */}
      <View style={styles.heroContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Hassle-free invoicing
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Create your professional invoice with just a few steps and get paid
          faster.
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button text="Sign up via Email" variant="filled" size="medium" />

          <Button
            text="Sign up via Google"
            variant="outlined"
            size="medium"
            icon={require('@/assets/images/logo.png')}
          />

          <Button
            text="Sign up via Apple"
            variant="outlined"
            size="medium"
            icon={require('@/assets/images/logo.png')}
          />
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: colors.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <Link href="/login" asChild>
            <Button text="Log in" variant="text" size="small" />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 20,
  },
  heroImage: {
    width: '80%',
    height: 240,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 12,
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
