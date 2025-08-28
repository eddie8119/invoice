import { ExtendedTheme } from '@/types/navigation';
import { StyleSheet } from 'react-native';

export const createFormStyles = (colors: ExtendedTheme['colors']) => {
  const inputBase = {
    fontSize: 16,
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: 999,
    backgroundColor: colors.primaryLight,
  };

  return StyleSheet.create({
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
      color: colors.error,
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
      ...inputBase,
      height: 150,
      padding: 16,
      borderRadius: 16,
      textAlignVertical: 'top',
    },
    // 下拉選單系列
    pickerWrapper: {
      position: 'relative',
    },
    pickerDisplay: {
      ...inputBase,
      width: '100%',
      justifyContent: 'center',
    },
    picker: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0, // 完全透明 隱藏
      zIndex: 1, // 確保它在 display view 上方
    },
    pickerFocused: {
      borderColor: colors.primary, // focus 狀態
    },
    pickerError: {
      borderColor: colors.error, // error 狀態
    },
    pickerChevron: {
      position: 'absolute',
      fontSize: 20,
      right: 16,
      top: '50%',
      transform: [{ translateY: -12 }],
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    menuContent: {
      backgroundColor: colors.primaryLight,
      borderRadius: 16,
    },
    // 日期選擇器
    datePicker: {
      ...inputBase,
      width: '100%',
      justifyContent: 'center',
    },
  });
};
