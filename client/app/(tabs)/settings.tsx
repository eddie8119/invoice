import { theme } from '@/constants/theme';
import { containerStyles } from '@/style/containers';

import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={containerStyles.upperSection}></View>

      <View style={containerStyles.lowerSection}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light.primary,
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});
