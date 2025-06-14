import { Divider } from '@/components/core/Divider';
import { ProgressBar } from '@/components/core/ProgressBar';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 上部分數據
interface BalanceData {
  receivable: number;
  expense: number;
  collected: number;
  expected: number;
}

const defaultBalanceData: BalanceData = {
  receivable: 1834.4,
  expense: 7783.0,
  collected: 4902,
  expected: 7980,
};

interface BalanceSectionProps {
  balanceData?: BalanceData;
}

export const BalanceSection: React.FC<BalanceSectionProps> = ({
  balanceData = defaultBalanceData,
}) => {
  // 計算進度條百分比
  const progressPercentage =
    (balanceData.collected / balanceData.expected) * 100;
  const progressFormatted = Math.round(progressPercentage);

  return (
    <>
      <View style={styles.balanceSection}>
        <View style={styles.balanceItem}>
          <View style={styles.labelContainer}>
            <Ionicons
              name="document-text-outline"
              size={16}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.balanceLabel}>本月應收帳款</Text>
          </View>
          <Text style={styles.balanceAmountReceivable}>
            $
            {balanceData.receivable.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
        <Divider />
        <View style={styles.balanceItem}>
          <View style={styles.labelContainer}>
            <Ionicons
              name="document-text-outline"
              size={16}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.balanceLabel}>本月應付帳款</Text>
          </View>
          <Text style={styles.balanceAmount}>
            $
            {balanceData.expense.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <ProgressBar
          progressPercentage={progressPercentage}
          progressFormatted={progressFormatted}
          balanceData={balanceData}
        />
        <View style={styles.progressLabelsBelow}>
          <View style={styles.progressLabelGroupLeft}>
            <Text style={styles.progressLabelSmall}>本月已收帳款 </Text>
            <Text style={styles.progressLabelAmount}>
              ${balanceData.collected.toLocaleString()}
            </Text>
          </View>
          <View style={styles.progressLabelGroupRight}>
            <Text style={styles.progressLabelSmall}>本月未收帳款</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  upperSection: {
    backgroundColor: theme.colors.light.primaryOceanBlue,
    padding: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 20,
  },
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceItem: {
    flex: 1,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 6,
  },
  balanceLabel: {
    fontSize: 14,
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceAmountReceivable: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.light.primaryOceanBlue,
  },
  progressSection: {
    marginTop: 16,
  },
  progressLabelsBelow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressLabelGroupLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  progressLabelGroupRight: {
    alignItems: 'flex-end',
  },
  progressLabelAmount: {
    color: theme.colors.light.primaryOceanBlue,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
  progressLabelSmall: {
    fontSize: 12,
    opacity: 0.8,
  },
});
