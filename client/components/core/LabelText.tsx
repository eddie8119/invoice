import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const LabelText = ({ label }: { label: string }) => {
  const { colors } = useTheme();
  return (
    <Text style={{ color: colors.text, marginBottom: 2, fontWeight: 'bold' }}>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({});
