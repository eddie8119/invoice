import { theme } from '@/constants/theme';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface H3Props {
  title: string;
  style?: StyleProp<TextStyle>;
}
const H3Title = ({ title, style }: H3Props) => {
  return <Text style={[styles.title, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.light.text,
    marginBottom: 8,
  },
});
export default H3Title;
