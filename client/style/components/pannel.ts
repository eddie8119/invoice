import { StyleSheet } from 'react-native';

const baseCard = {
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
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
