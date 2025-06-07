import { Tabs } from 'expo-router';
import React from 'react';

import BottomBar from '@/components/core/BottomBar';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { colors } from '@/constants/theme/color';
import { useColorScheme } from '@/hooks/useColorScheme';

interface TabConfig {
  name: string;
  title: string;
  icon: string;
}

const tabConfig: TabConfig[] = [
  {
    name: 'index',
    title: 'Home',
    icon: 'house.fill',
  },
  {
    name: 'invoice-upload',
    title: '上傳發票',
    icon: 'arrow.up.doc.fill',
  },
  {
    name: 'invoice-scan',
    title: '掃描發票',
    icon: 'camera.fill',
  },
  {
    name: 'invoice-report',
    title: '發票報表',
    icon: 'doc.text.fill',
  },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarShowLabel: false,
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
  );
}
