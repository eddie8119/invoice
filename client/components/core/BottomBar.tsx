import { theme } from '@/constants/theme';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { tabConfig } from '@/constants/navigation';

export default function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      {tabConfig.map((item, index) => {
        const isActive = pathname === item.route;
        const isMiddleItem = index === 2; // Scan button in the middle

        return (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.itemContainer,
              isMiddleItem && styles.middleItemContainer,
            ]}
            onPress={() => handleNavigation(item.route)}
          >
            <View
              style={[
                styles.iconContainer,
                isActive && !isMiddleItem && styles.activeIconContainer,
                isMiddleItem && styles.middleIconContainer,
              ]}
            >
              <Image source={item.icon} style={{ width: 20, height: 20 }} />
            </View>
            {!isMiddleItem && (
              <Text
                style={[styles.itemLabel, isActive && styles.activeItemLabel]}
              >
                {item.name}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    borderTopWidth: 1,
    borderTopColor: theme.colors.light.divider,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: theme.colors.light.primaryLight,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleItemContainer: {
    marginTop: -50,
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  activeIconContainer: {
    backgroundColor: theme.colors.light.primary,
    ...theme.shadows.small,
  },
  middleIconContainer: {
    backgroundColor: theme.colors.light.primaryBlue,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  itemLabel: {
    fontSize: 11,
    marginTop: 3,
    color: theme.colors.light.textSecondary,
    fontWeight: '400',
  },
  activeItemLabel: {
    color: theme.colors.light.primary,
    fontWeight: '500',
  },
});
