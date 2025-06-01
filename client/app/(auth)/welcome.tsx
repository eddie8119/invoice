import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.buttonPrimary }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>
              Sign up via Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.socialButton,
              {
                backgroundColor: colors.buttonSecondary,
                borderColor: colors.border,
              },
            ]}
            activeOpacity={0.8}
          >
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.socialIcon}
            />
            <Text style={[styles.buttonText, { color: colors.text }]}>
              Sign up via Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.socialButton,
              {
                backgroundColor: colors.buttonSecondary,
                borderColor: colors.border,
              },
            ]}
            activeOpacity={0.8}
          >
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.socialIcon}
            />
            <Text style={[styles.buttonText, { color: colors.text }]}>
              Sign up via Apple
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: colors.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={[styles.loginLink, { color: colors.primary }]}>
                Log in
              </Text>
            </TouchableOpacity>
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
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
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
