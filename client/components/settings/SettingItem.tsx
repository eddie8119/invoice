import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightElement?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  onPress,
  showArrow = true,
  rightElement,
}) => {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingItemLeft}>
        {icon}
        <Text style={styles.settingItemText}>{title}</Text>
      </View>
      <View style={styles.settingItemRight}>
        {rightElement}
        {showArrow && (
          <Ionicons name="chevron-forward" size={20} color="#888" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    color: '#333',
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SettingItem;
