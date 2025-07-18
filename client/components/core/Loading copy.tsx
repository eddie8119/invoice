import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NotFoundProps {
  message?: string;
}

const NotFound = ({ message }: NotFoundProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Text>找不到{message}資訊</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotFound;
