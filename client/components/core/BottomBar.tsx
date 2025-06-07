import { Colors } from '@/constants/Colors';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BottomBarItem = {
  name: string;
  icon: string | number;
  route: string;
};

const bottomBarItems: BottomBarItem[] = [
  {
    name: 'Home',
    icon: require('@/assets/icons/Home.png'),
    route: '/',
  },
  {
    name: 'Analytics',
    icon: require('@/assets/icons/User.png'),
    route: '/invoice-report',
  },
  {
    name: 'Scan',
    icon: require('@/assets/icons/User.png'),
    route: '/invoice-scanner',
  },
  {
    name: 'List',
    icon: require('@/assets/icons/User.png'),
    route: '/invoice-upload',
  },
  {
    name: 'Profile',
    icon: require('@/assets/icons/User.png'),
    route: '/profile',
  },
];

export default function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <View style={styles.container}>
      {bottomBarItems.map((item, index) => {
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
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
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
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // 預設透明
  },
  activeIconContainer: {
    backgroundColor: '#F3E8FF',
  },
  middleIconContainer: {
    backgroundColor: Colors.light.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  itemLabel: {
    fontSize: 12,
    marginTop: 2,
    color: '#9CA3AF',
  },
  activeItemLabel: {
    color: Colors.light.primary,
    fontWeight: '500',
  },
});
