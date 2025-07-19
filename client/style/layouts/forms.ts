import { ExtendedTheme } from '@/types/navigation';
import { StyleSheet } from 'react-native';

export const createFormStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
  form: {
    gap: 24,
    marginBottom: 32,
  },
  inputContainer: {
    gap: 20,
  },
  submitButton: {
    marginTop: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputWrapper: {
    height: 48,
    borderWidth: 1,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },

  // Input icon
  inputIcon: {
    paddingHorizontal: 16,
  },

  // Helper text
  helperText: {
    fontSize: 12,
    marginTop: 4,
    color: colors.textSecondary,
  },

  // Error state
  error: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },

  // Success state
  success: {
    borderColor: colors.success,
  },
  successText: {
    color: colors.success,
    fontSize: 12,
    marginTop: 4,
  },
});
