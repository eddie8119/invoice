import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

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
    name: 'invoice-report',
    title: '發票報表',
    icon: 'doc.text.fill',
  },
  {
    name: 'scan',
    title: '掃描發票',
    icon: 'camera.fill',
  },
]

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: 'white',
            position: 'absolute',
          },
          default: {},
        }),
      }}
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
  )
}
