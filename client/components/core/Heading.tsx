import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface HeadingProps {
  level: 1 | 2 | 3;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  marginBottom?: number;
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  style,
  color,
  marginBottom,
}) => {
  const { colors } = useTheme();

  const headingStyles = {
    1: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 36,
      color: color || colors.text,
    },
    2: {
      // 改過
      fontSize: 18,
      fontWeight: '600',
      color: color || colors.text,
    },
    3: {
      // 改過
      fontSize: 16,
      fontWeight: '600',
      marginBottom: marginBottom || 8,
      color: color || colors.text,
    },
  } as const;

  const baseStyle = headingStyles[level];
  const combinedStyle = [baseStyle, { marginBottom }, style];

  return <Text style={combinedStyle}>{children}</Text>;
};

const styles = StyleSheet.create({});
