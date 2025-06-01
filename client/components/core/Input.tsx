import { Colors } from '@/constants/Colors';
import { formStyles } from '@/style/forms';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export function Input({
  label,
  error,
  success,
  helperText,
  containerStyle,
  inputStyle,
  isPassword,
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const colors = Colors.light;

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

  const renderPasswordIcon = () => (
    <TouchableOpacity
      style={formStyles.inputIcon}
      onPress={() => setShowPassword(!showPassword)}
    >
      <Ionicons
        name={showPassword ? 'eye-off' : 'eye'}
        size={24}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );

  const renderCustomIcon = (
    iconName: keyof typeof Ionicons.glyphMap,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={formStyles.inputIcon}
      onPress={onPress}
      disabled={!onPress}
    >
      <Ionicons name={iconName} size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={[formStyles.inputContainer, containerStyle]}>
      {label && (
        <Text
          style={[
            formStyles.helperText,
            { color: colors.text, fontSize: 14, fontWeight: '500' },
          ]}
        >
          {label}
        </Text>
      )}

      <View
        style={[formStyles.inputWrapper, { borderColor: getBorderColor() }]}
      >
        {leftIcon && renderCustomIcon(leftIcon)}
        <TextInput
          {...props}
          style={[formStyles.inputField, { color: colors.text }, inputStyle]}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={colors.textSecondary}
        />
        {isPassword && renderPasswordIcon()}
        {!isPassword &&
          rightIcon &&
          renderCustomIcon(rightIcon, onRightIconPress)}
      </View>

      {(error || success || helperText) && (
        <Text style={[formStyles.helperText, { color: getHelperColor() }]}>
          {error || success || helperText}
        </Text>
      )}
    </View>
  );
}
