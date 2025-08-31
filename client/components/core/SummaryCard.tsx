import { theme } from '@/constants/theme';
import { formatMoneyShow } from '@/utils/formatNumber';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
interface SummaryCardProps {
  label: string;
  amount: string;
  isError?: boolean;
  cardStyle?: object;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  onPress?: () => void;
}

export const SummaryCard = ({
  label,
  amount,
  isError = false,
  cardStyle,
  backgroundColor,
  borderColor,
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
        borderColor ? { borderColor } : null,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.2 : 1}
      disabled={!onPress}
    >
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[
          styles.amount,
          isError && { color: colors.error },
          textColor ? { color: textColor } : null,
        ]}
      >
        <Text style={[styles.dollarSign]}>TWD$ </Text>
        {formatMoneyShow(Number(amount))}
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
    shadowRadius: 2,
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
    color: 'gray',
  },
});
