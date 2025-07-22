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

    // 有在使用
    textarea: {
      height: 160,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.primaryLight,
      borderRadius: 16,
      backgroundColor: colors.primaryLight,
      fontSize: 16,
      textAlignVertical: 'top',
    },
    // 下拉選單系列
    picker: {
      height: 48,
      width: '100%',
      borderColor: colors.primaryLight,
      borderRadius: 999,
      backgroundColor: colors.primaryLight,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    pickerFocused: {
      borderColor: colors.primary, // focus 狀態
    },
    pickerError: {
      borderColor: colors.error, // error 狀態
    },
    menuContent: {
      backgroundColor: colors.primaryLight,
      borderRadius: 16,
    },
    // 日期選擇器
    datePicker: {
      height: 48,
      width: '100%',
      borderColor: colors.primaryLight,
      borderRadius: 999,
      backgroundColor: colors.primaryLight,
      justifyContent: 'center',
      paddingHorizontal: 16,
      borderWidth: 1,
      fontSize: 16,
      color: '#4a6462',
      boxSizing: 'border-box',
    },
  });
