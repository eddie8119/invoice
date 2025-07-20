import { theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.light.buttonPrimary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: theme.colors.light.buttonSecondary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.light.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium,
  },
  textSecondary: {
    color: theme.colors.light.textSecondary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.regular,
  },
  disabled: {
    opacity: 0.5,
  },

  // === Base Styles ===
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },

  // === Button Sizes ===
  small: {
    height: 36,
    paddingHorizontal: 16,
  },
  medium: {
    height: 48,
    paddingHorizontal: 24,
  },
  large: {
    height: 56,
    paddingHorizontal: 32,
  },

  // === Variants ===
  outlined: {
    borderWidth: 1,
  },
  text: {
    backgroundColor: 'transparent',
  },

  // === Social Buttons ===
  social: {
    flexDirection: 'row',
    borderWidth: 1,
    height: 48,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  // === Text ===
  buttonText: {
    fontSize: 16,
    fontWeight: theme.typography.fontWeights.semiBold,
    textAlign: 'center',
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  buttonTextLarge: {
    fontSize: 18,
  },

  // === Container ===
  buttonContainer: {
    gap: 12,
    marginBottom: 24,
  },
});

export type ButtonStyleNames = keyof typeof buttonStyles;
