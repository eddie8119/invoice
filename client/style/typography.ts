import { theme } from '@/constants/theme';
import { StyleSheet, TextStyle } from 'react-native';

export const textStyles = StyleSheet.create({
  h1: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold as TextStyle['fontWeight'],
    color: theme.colors.light.text,
    marginBottom: theme.spacing.sm,
    lineHeight: theme.typography.lineHeights.xl,
  },
  h2: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold as TextStyle['fontWeight'],
    color: theme.colors.light.text,
    marginBottom: theme.spacing.sm,
    lineHeight: theme.typography.lineHeights.lg,
  },
  h3: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.medium as TextStyle['fontWeight'],
    color: theme.colors.light.text,
    marginBottom: theme.spacing.xs,
    lineHeight: theme.typography.lineHeights.lg,
  },
  h4: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium as TextStyle['fontWeight'],
    color: theme.colors.light.text,
    marginBottom: theme.spacing.xs,
    lineHeight: theme.typography.lineHeights.md,
  },
  body: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.light.text,
    lineHeight: theme.typography.lineHeights.md,
  },
  caption: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.light.textSecondary,
    lineHeight: theme.typography.lineHeights.sm,
  },
  error: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.light.error,
    lineHeight: theme.typography.lineHeights.sm,
  },
  textCenter: {
    textAlign: 'center' as TextStyle['textAlign'],
  },
  textRight: {
    textAlign: 'right' as TextStyle['textAlign'],
  },
  textLeft: {
    textAlign: 'left' as TextStyle['textAlign'],
  },
});

export type TextStyleNames = keyof typeof textStyles;
