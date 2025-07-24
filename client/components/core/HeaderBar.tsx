import { Heading } from '@/components/core/Heading';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderBarProps {
  title: string;
  showBack?: boolean;
}

export const HeaderBar = ({ title, showBack = true }: HeaderBarProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ paddingTop: insets.top }]}>
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

        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="notifications-outline" size={24} />
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
  },
  backButton: {
    padding: 4,
  },
  iconButton: {
    padding: 8,
  },
});
