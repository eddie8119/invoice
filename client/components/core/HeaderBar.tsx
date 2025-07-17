import { Heading } from '@/components/core/Heading';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderBarProps {
  title: string;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
}

export const HeaderBar = ({
  title,
  showBack = true,
  rightComponent,
}: HeaderBarProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[{ paddingTop: insets.top, backgroundColor: colors.primary }]}>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {showBack && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Image
                source={require('@/assets/icons/arrow-back.png')}
                style={{ width: 16, height: 16, tintColor: colors.text }}
              />
            </TouchableOpacity>
          )}
        </View>

        <Heading level={2}>{title}</Heading>

        <View style={styles.rightContainer}>{rightComponent}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  leftContainer: {
    minWidth: 40,
  },
  rightContainer: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 4,
  },
  title: {
    // flex: 1,
    fontSize: 18,
    fontWeight: '600',
    // textAlign: 'center',
    // marginHorizontal: 8,
  },
});
