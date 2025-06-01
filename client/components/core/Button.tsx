import { Colors } from '@/constants/Colors';
import { buttonStyles } from '@/style/buttons';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'filled' | 'outlined' | 'text';

interface ButtonProps {
  text: string;
  onPress?: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export function Button({
  text,
  onPress,
  size = 'medium',
  variant = 'filled',
  icon,
  style,
  disabled = false,
}: ButtonProps) {
  const colors = Colors.light;

  // 根據 variant 決定背景色和文字顏色
  const getColors = () => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: colors.buttonPrimary,
          textColor: colors.background,
          borderColor: 'transparent',
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          textColor: colors.buttonPrimary,
          borderColor: colors.buttonPrimary,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          textColor: colors.buttonPrimary,
          borderColor: 'transparent',
        };
    }
  };

  // 根據 size 獲取對應的樣式
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return buttonStyles.small;
      case 'medium':
        return buttonStyles.medium;
      case 'large':
        return buttonStyles.large;
    }
  };

  const { backgroundColor, textColor, borderColor } = getColors();

  return (
    <TouchableOpacity
      style={[
        buttonStyles.base,
        getSizeStyle(),
        {
          backgroundColor,
          borderColor,
          borderWidth: variant === 'outlined' ? 1 : 0,
          opacity: disabled ? 0.6 : 1,
        },
        icon ? buttonStyles.social : undefined,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && (
        <Image source={icon} style={buttonStyles.socialIcon} resizeMode="contain" />
      )}
      <Text
        style={[
          buttonStyles.buttonText,
          { color: textColor },
          size === 'small' && buttonStyles.buttonTextSmall,
          size === 'large' && buttonStyles.buttonTextLarge,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}