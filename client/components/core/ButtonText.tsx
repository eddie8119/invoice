import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { buttonStyles } from '@/style/components/buttons';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'filled' | 'outlined' | 'text';

interface ButtonTextProps {
  text: string;
  onPress?: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ImageSourcePropType;
  style?: StyleProp<ViewStyle & { textColor?: string }>;
  disabled?: boolean;
}

export function ButtonText({
  text,
  onPress,
  size = 'medium',
  variant = 'filled',
  icon,
  style,
  disabled = false,
}: ButtonTextProps) {
  const { colors } = useTheme();

  // 扁平化 style prop 以便我們可以安全地提取 textColor
  const { textColor, ...containerStyle } = StyleSheet.flatten(style) || {};

  const getColors = () => {
    // The colors object from useTheme might not have `buttonPrimary`.
    // We'll use `primary` for the button color and `background` for the text color in filled variant.
    // This aligns with the theme structure we defined in _layout.tsx.
    const buttonPrimaryColor = colors.primary;

    switch (variant) {
      case 'filled':
        return {
          backgroundColor: buttonPrimaryColor,
          textColor: 'black', // Use card color for text on primary background for better contrast
          borderColor: 'transparent',
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          textColor: buttonPrimaryColor,
          borderColor: buttonPrimaryColor,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          textColor: buttonPrimaryColor,
          borderColor: 'transparent',
        };
    }
  };

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

  const {
    backgroundColor,
    borderColor,
    textColor: defaultTextColor,
  } = getColors();

  const textStyle: StyleProp<TextStyle> = [
    buttonStyles.buttonText,
    { color: textColor || defaultTextColor }, // 優先使用 style prop 中的 textColor
    size === 'small' && buttonStyles.buttonTextSmall,
    size === 'large' && buttonStyles.buttonTextLarge,
  ];

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
        containerStyle, // 應用剩餘的樣式
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && (
        <Image
          source={icon}
          style={buttonStyles.socialIcon as ImageStyle} // Explicitly cast to ImageStyle
          resizeMode="contain"
        />
      )}
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}
