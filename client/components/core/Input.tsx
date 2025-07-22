import { createFormStyles } from '@/style/layouts/forms';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

// 自定義輸入框屬性，不再繼承 Paper 的 TextInputProps
interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoComplete?:
    | 'email'
    | 'password'
    | 'off'
    | 'username'
    | 'name'
    | 'tel'
    | 'street-address'
    | 'postal-code'
    | 'cc-number'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year';
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  // 自定義屬性
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  inputStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  disabled?: boolean;
}

export function Input({
  label,
  error,
  success,
  helperText,
  inputStyle,
  isPassword,
  rightIcon,
  onRightIconPress,
  placeholder,
  value,
  onChangeText,
  onBlur,
  onFocus,
  autoCapitalize,
  autoCorrect,
  autoComplete,
  keyboardType,
  disabled,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useTheme();
  const formStyles = createFormStyles(colors);

  const getHelperColor = () => {
    if (error) return colors.error;
    if (success) return colors.success;
    return colors.textSecondary;
  };

  const getBorderColor = () => {
    if (error) return colors.error;
    if (success) return colors.success;
    return colors.border;
  };

  // 將 Ionicons 名稱轉換為 React Native Paper 的圖示名稱
  const getIconName = (ionIconName: string) => {
    // 這裡可以根據需要添加更多映射
    const iconMap: Record<string, string> = {
      eye: 'eye',
      'eye-off': 'eye-off',
      mail: 'email',
      'lock-closed': 'lock',
      person: 'account',
      calendar: 'calendar',
      document: 'file-document',
      cash: 'cash',
    };

    return iconMap[ionIconName] || ionIconName;
  };

  return (
    <View>
      {label && (
        <Text
          style={{ color: colors.text, marginBottom: 2, fontWeight: 'bold' }}
        >
          {label}
        </Text>
      )}
      <TextInput
        mode="outlined"
        secureTextEntry={isPassword && !showPassword}
        outlineColor={getBorderColor()}
        activeOutlineColor={colors.primary}
        style={[
          { backgroundColor: colors.primaryLight, height: 48 },
          inputStyle,
        ]}
        error={!!error}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onFocus={onFocus}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete as any}
        keyboardType={keyboardType}
        disabled={disabled}
        right={
          isPassword ? (
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              color={colors.textSecondary}
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : rightIcon ? (
            <TextInput.Icon
              icon={getIconName(rightIcon)}
              color={colors.textSecondary}
              onPress={onRightIconPress}
            />
          ) : undefined
        }
        theme={{
          roundness: 999,
          colors: {
            primary: colors.primary,
            error: colors.error,
            onSurfaceVariant: colors.textSecondary,
          },
        }}
      />

      {(error || success || helperText) && (
        <Text style={formStyles.helperText}>
          {error || success || helperText}
        </Text>
      )}
    </View>
  );
}
