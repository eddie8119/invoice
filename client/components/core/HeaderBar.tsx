import { Heading } from '@/components/core/Heading';
import { theme } from '@/constants/theme';
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
  const colors = theme.colors.light;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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
                style={{ width: 16, height: 16 }}
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
  container: {
    // 移除底線，不設置 borderBottomWidth 或 shadow
    backgroundColor: theme.colors.light.primary,
  },
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
