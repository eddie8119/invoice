import { theme } from '@/constants/theme';
import { ExtendedTheme } from '@/types/navigation';
import { StyleSheet } from 'react-native';

export const createContainerStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    upperSection: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    lowerSection: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
      backgroundColor: colors.surface,
      borderTopLeftRadius: theme.radius.xxl,
      borderTopRightRadius: theme.radius.xxl,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    padding: {
      padding: theme.spacing.md,
    },
    margin: {
      margin: theme.spacing.md,
    },

    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 32,
    },
    modalContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.primaryGreenWhite,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      padding: 24,
    },
  });

export type ContainerStyleNames = keyof ReturnType<
  typeof createContainerStyles
>;
