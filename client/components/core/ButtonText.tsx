import { buttonStyles } from '@/style/components/buttons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle, // Import ImageStyle
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'filled' | 'outlined' | 'text';

interface ButtonTextProps {
  text: string;
  onPress?: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
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

  // 根據 variant 決定背景色和文字顏色
  const getColors = () => {
    // The colors object from useTheme might not have `buttonPrimary`.
    // We'll use `primary` for the button color and `background` for the text color in filled variant.
    // This aligns with the theme structure we defined in _layout.tsx.
    const buttonPrimaryColor = colors.primary; // Assuming primary is the main button color
    const buttonTextColor = colors.text;

    switch (variant) {
      case 'filled':
        return {
          backgroundColor: buttonPrimaryColor,
          textColor: colors.card, // Use card color for text on primary background for better contrast
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
        <Image
          source={icon}
          style={buttonStyles.socialIcon as ImageStyle} // Explicitly cast to ImageStyle
          resizeMode="contain"
        />
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
