import { HapticTab } from '@/components/HapticTab';
import ButtomBar from '@/components/core/ButtomBar';
import { HeaderBar } from '@/components/core/HeaderBar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { tabConfig } from '@/constants/navigation';
import { useTheme } from '@react-navigation/native';
import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function TabLayout() {
  const pathname = usePathname();
  const { colors } = useTheme();

  const currentTab =
    tabConfig.find(tab => {
      if (tab.route === '/' && pathname === '/') return true;
      if (tab.route !== '/' && pathname.startsWith(tab.route)) return true;
      return false;
    }) || tabConfig[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <HeaderBar title={currentTab.name} />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: { display: 'none' }, // Hide the default tab bar
        }}
        tabBar={() => <ButtomBar />}
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
    </SafeAreaView>
  );
}
