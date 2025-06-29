import { theme } from '@/constants/theme';
import { Link, router, Href } from 'expo-router';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footerLinkText?: string;
  footerLinkHref?: Href;
  footerText?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const AuthLayout = ({
  title,
  subtitle,
  children,
  footerLinkText,
  footerLinkHref,
  footerText,
  showBackButton = false,
  onBackPress,
}: AuthLayoutProps) => {
  const colors = theme.colors.light;

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}

        {/* Form or other content */}
        <View style={styles.formContainer}>{children}</View>

        {/* Footer with link */}
        {footerLinkText && footerLinkHref && (
          <View style={styles.footerContainer}>
            {footerText && (
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                {footerText}{' '}
              </Text>
            )}
            <Link href={footerLinkHref} asChild>
              <TouchableOpacity>
                <Text style={[styles.link, { color: colors.primary }]}>
                  {footerLinkText}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  formContainer: {
    gap: 12,
    marginTop: 32,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
  },
});
