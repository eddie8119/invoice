import { StyleSheet } from 'react-native';

const baseCard = {
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 16,
  // iOS shadow
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  // Android shadow
  elevation: 4,
};

export const pannelStyles = StyleSheet.create({
  card: {
    ...baseCard,
  },
  summaryCard: {
    ...baseCard,
    width: '48%',
    alignItems: 'center',
  },
});

export type PannelStyleNames = keyof typeof pannelStyles;
