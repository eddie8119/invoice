import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    width: 1,
    backgroundColor: 'white',
    opacity: 0.3,
    marginHorizontal: 16,
  },
});
