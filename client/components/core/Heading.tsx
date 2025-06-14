import { theme } from '@/constants/theme';
import { StyleSheet, Text } from 'react-native';

interface HeadingProps {
  level: 1 | 2 | 3;
  children: React.ReactNode;
  style?: unknown;
  color?: string;
  marginBottom?: number;
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  style,
  color,
  marginBottom = 16,
}) => {
  const headingStyles = {
    1: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 36,
      color: color || theme.colors.light.text,
    },
    2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
      color: color || theme.colors.light.text,
    },
    3: {
      fontSize: 20,
      fontWeight: '500',
      lineHeight: 28,
      color: color || theme.colors.light.text,
    },
  } as const;

  const baseStyle = headingStyles[level];
  const combinedStyle = [baseStyle, { marginBottom }, style];

  return <Text style={combinedStyle}>{children}</Text>;
};

const styles = StyleSheet.create({});
