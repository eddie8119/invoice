import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Divider = () => {
  const { colors } = useTheme();
  return <View style={[styles.divider, { backgroundColor: colors.border }]} />;
};

const styles = StyleSheet.create({
  divider: {
    width: 1,
    opacity: 0.3,
    marginHorizontal: 16,
  },
});
