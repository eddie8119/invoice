import { theme } from '@/constants/theme';
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
  contentCard: {
    flex: 1,
    backgroundColor: theme.colors.light.primaryGreenWhite,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 20,
    overflow: 'hidden',
  },
  card: {
    ...baseCard,
  },
  summaryCard: {
    ...baseCard,
    width: '48%',
    alignItems: 'center',
  },
});
