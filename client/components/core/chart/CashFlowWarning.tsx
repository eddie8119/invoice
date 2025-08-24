import { Ionicons } from '@expo/vector-icons';
import { CashFlowWarningProps } from '@/types/chart';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CashFlowWarning: React.FC<CashFlowWarningProps> = ({ negativeDates }) => {
  if (negativeDates.length === 0) return null;

  return (
    <View style={styles.warningContainer}>
      <View style={styles.warningIconContainer}>
        <Ionicons name="warning-outline" size={24} color="#F5A623" />
      </View>
      <View style={styles.warningTextContainer}>
        <Text style={styles.warningText}>
          你的現金水位 {negativeDates.join(' ')} 不足以支付
          應付帳款， 請提早應對
        </Text>
      </View>
      <View style={styles.warningButtonsContainer}>
        <TouchableOpacity style={styles.warningButton}>
          <Text style={styles.warningButtonText}>調整付款日</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.warningButtonHighlight}>
          <Text style={styles.warningButtonHighlightText}>增資</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  warningContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F5A623',
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  warningIconContainer: {
    marginRight: 12,
  },
  warningTextContainer: {
    flex: 1,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  warningButtonsContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: 8,
  },
  warningButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#00C896',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  warningButtonText: {
    color: '#00C896',
    fontSize: 14,
    textAlign: 'center',
  },
  warningButtonHighlight: {
    backgroundColor: '#00C896',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  warningButtonHighlightText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
});
