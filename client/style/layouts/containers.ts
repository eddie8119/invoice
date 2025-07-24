import { theme } from '@/constants/theme';
import { ExtendedTheme } from '@/types/navigation';
import { Dimensions, StyleSheet } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export const createContainerStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    upperSection: {
      padding: theme.spacing.lg,
      paddingTop: 0,
    },
    lowerSection: {
      flex: 1,
      padding: 24,
      backgroundColor: colors.primaryGreenWhite,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    cardContainer: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.primary,
      marginBottom: 16,
    },
    modalContainer: {
      width: '90%',
      maxHeight: screenHeight * 0.85,
      backgroundColor: colors.primaryGreenWhite,
      borderRadius: 10,
      padding: 20,
      alignItems: 'stretch',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      position: 'relative',
    },
    iconContainer: {
      width: 35,
      height: 35,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
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
  });

export type ContainerStyleNames = keyof ReturnType<
  typeof createContainerStyles
>;
