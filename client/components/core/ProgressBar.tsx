import { theme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProgressBarProps {
  progressPercentage: number;
  progressFormatted: number;
  balanceData: {
    collected: number;
    expected: number;
  };
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercentage,
  progressFormatted,
  balanceData,
}) => (
  <View style={styles.progressBar}>
    <View style={[styles.progress, { width: `${progressPercentage}%` }]}>
      <Text style={styles.progressPercentText}>{progressFormatted}%</Text>
    </View>

    {progressPercentage < 100 && (
      <Text style={styles.progressRemainingAmountText}>
        $
        {Math.round(
          balanceData.expected - balanceData.collected
        ).toLocaleString()}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  progressBar: {
    height: 27,
    backgroundColor: '#052224',
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  progress: {
    height: '100%',
    backgroundColor: '#F0F5F5',
    justifyContent: 'center',
    paddingLeft: 12,
    borderRadius: 18,
  },
  progressPercentText: {
    color: theme.colors.light.primaryOceanBlue,
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressRemainingAmountText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute',
    right: 12,
  },
});
