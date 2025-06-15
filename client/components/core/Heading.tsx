import { theme } from '@/constants/theme';
import { StyleSheet, Text } from 'react-native';

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
  const headingStyles = {
    1: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 36,
      color: color || theme.colors.light.text,
    },
    2: {
      // 改過
      fontSize: 18,
      fontWeight: '600',
      color: color || theme.colors.light.text,
    },
    3: {
      // 改過
      fontSize: 16,
      fontWeight: '600',
      marginBottom: marginBottom || 8,
      color: color || theme.colors.light.text,
    },
  } as const;

  const baseStyle = headingStyles[level];
  const combinedStyle = [baseStyle, { marginBottom }, style];

  return <Text style={combinedStyle}>{children}</Text>;
};

const styles = StyleSheet.create({});
