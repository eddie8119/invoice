import { StyleSheet } from 'react-native';

const baseCard = {
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
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
