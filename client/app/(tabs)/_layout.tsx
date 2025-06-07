import BottomBar from '@/components/core/BottomBar';
import { HeaderBar } from '@/components/core/HeaderBar';
import { HomeHeader } from '@/components/core/HomeHeader';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { tabConfig } from '@/constants/navigation';
import { colors } from '@/constants/theme/color';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs, usePathname } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  // 獲取當前頁面的配置
  const currentTab =
    tabConfig.find(tab => pathname === `/${tab.name}`) || tabConfig[0];

  const isHomePage = pathname === '/';

  return (
    <>
      {isHomePage ? <HomeHeader /> : <HeaderBar title={currentTab.title} />}

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
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
    </>
  );
}
