import { theme } from '@/constants/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loading = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primaryDarkBlue} />
      <Text style={[styles.text, { color: colors.text }]}>載入中...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.fontSizes.md,
  },
});

export default Loading;
