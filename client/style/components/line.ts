import { ExtendedTheme } from '@/types/navigation';
import { StyleSheet } from 'react-native';

export const createLineStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
    divider: {
      height: 1,
      backgroundColor: colors.primary,
    },
  });

export type LineStyleNames = keyof ReturnType<typeof createLineStyles>;
