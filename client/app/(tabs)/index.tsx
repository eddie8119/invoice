import { BalanceSection } from '@/components/home/BalanceSection';
import { MenuSection } from '@/components/home/MenuSection';
import { TransactionsSection } from '@/components/home/TransactionsSection';
import { createContainerStyles } from '@/style/layouts/containers';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={containerStyles.upperSection}>
        <BalanceSection />
      </View>

      <View style={containerStyles.lowerSection}>
        <MenuSection />
        <TransactionsSection />
      </View>
    </ScrollView>
  );
}
