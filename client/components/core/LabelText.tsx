import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface LabelTextProps {
  label: string;
  style?: StyleProp<TextStyle>;
}

export const LabelText = ({ label, style }: LabelTextProps) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          color: colors.text,
          marginBottom: 2,
          fontWeight: 'bold',
        },
        style,
      ]}
    >
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({});
