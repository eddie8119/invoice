import { StyleSheet } from 'react-native';

export const linkStyles = StyleSheet.create({
  link: {
    fontSize: 14,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
});

export type LinkStyleNames = keyof typeof linkStyles;
