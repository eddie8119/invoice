import { usePathname, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { bottomTabConfig } from '@/constants/navigation';
import { useTheme } from '@react-navigation/native';

export default function ButtomBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          height: 80,
          borderTopWidth: 1,
          borderTopColor: colors.divider,
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingHorizontal: 16,
          backgroundColor: colors.primaryLight,
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
          height: '100%',
        },
        itemLabel: {
          marginTop: 4,
          fontSize: 12,
          color: colors.textSecondary,
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
        activeItemLabel: {
          color: colors.primary,
        },
        activeIconContainer: {
          backgroundColor: colors.primary,
          borderRadius: 12,
          padding: 4,
        },
        middleIconContainer: {
          backgroundColor: colors.primaryMainBlue,
          width: 65,
          height: 65,
          borderRadius: 32.5,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 30,
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }),
    [colors]
  );

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      {bottomTabConfig.map((item, index) => {
        const isActive = pathname === item.route;
        const isMiddleItem = index === 2; // Scan button in the middle

        return (
          <TouchableOpacity
            key={item.name}
            activeOpacity={0.8} // Add visual feedback on press
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
