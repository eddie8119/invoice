import { createContainerStyles } from '@/style/layouts/containers';
import { useTheme } from '@react-navigation/native';
import { Href, Link } from 'expo-router';
import React, { ReactNode, useMemo } from 'react';
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
  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={[
          containerStyles.upperSection,
          { alignItems: 'center', justifyContent: 'center', height: '20%' },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>

      <View style={containerStyles.lowerSection}>
        {children}

        {/* Footer with link */}
        {footerLinkText && footerLinkHref && (
          <View style={styles.footerContainer}>
            {footerText && (
              <Text style={{ color: colors.textSecondary }}>{footerText} </Text>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
  },
});
