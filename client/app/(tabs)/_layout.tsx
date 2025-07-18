import BottomBar from '@/components/core/BottomBar';
import { HeaderBar } from '@/components/core/HeaderBar';
import { HomeHeader } from '@/components/core/HomeHeader';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { tabConfig } from '@/constants/navigation';
import { colors } from '@/constants/theme/color';
import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { useColorScheme, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const currentTab =
    tabConfig.find(tab => {
      if (tab.route === '/' && pathname === '/') return true;
      if (tab.route !== '/' && pathname.startsWith(tab.route)) return true;
      return false;
    }) || tabConfig[0];

  const isHomePage = pathname === '/';

  return (
    <View style={{ flex: 1, backgroundColor: colors.light.primary }}>
      {isHomePage ? <HomeHeader /> : <HeaderBar title={currentTab.name} />}

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors[colorScheme ?? 'light'].primary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: { display: 'none' }, // Hide the default tab bar
        }}
        tabBar={() => <BottomBar />}
      >
        {tabConfig.map(({ name, title, icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title,
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name={icon} color={color} />
              ),
            }}
          />
        ))}
      </Tabs>
    </View>
  );
}
