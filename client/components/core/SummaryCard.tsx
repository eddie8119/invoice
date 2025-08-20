import { theme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SummaryCardProps {
  label: string;
  amount: string;
  isError?: boolean;
  cardStyle?: object;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
}

export const SummaryCard = ({
  label,
  amount,
  isError = false,
  cardStyle,
  backgroundColor,
  textColor,
  onPress,
}: SummaryCardProps) => {
  const colors = theme.colors.light;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        cardStyle,
        backgroundColor ? { backgroundColor } : null,
      ]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[
          styles.amount,
          isError && { color: colors.error },
          textColor ? { color: textColor } : null,
        ]}
      >
        <Text
          style={[styles.dollarSign, textColor ? { color: textColor } : null]}
        >
          TWD${' '}
        </Text>
        {amount}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.light.primaryOceanBlue,
  },
  dollarSign: {
    fontSize: 16,
    color: theme.colors.light.primary,
  },
});
