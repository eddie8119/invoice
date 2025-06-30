import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import SettingItem from './SettingItem';

const SettingsList: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.settingsSection}>
      <SettingItem
        icon={
          <View style={[styles.iconContainer, { backgroundColor: '#e0e0ff' }]}>
            <Ionicons name="moon" size={20} color="#5050ff" />
          </View>
        }
        title="深色模式"
        showArrow={false}
        rightElement={
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#d1d1d1', true: '#5050ff' }}
            thumbColor="#fff"
          />
        }
      />

      <SettingItem
        icon={
          <View style={[styles.iconContainer, { backgroundColor: '#e0e0ff' }]}>
            <Ionicons name="person" size={20} color="#5050ff" />
          </View>
        }
        title="個人資料"
        onPress={() => console.log('Navigate to personal info')}
      />

      <SettingItem
        icon={
          <View style={[styles.iconContainer, { backgroundColor: '#fff0e0' }]}>
            <Ionicons name="card" size={20} color="#ff9500" />
          </View>
        }
        title="銀行與卡片"
        onPress={() => console.log('Navigate to bank & cards')}
      />

      <SettingItem
        icon={
          <View style={[styles.iconContainer, { backgroundColor: '#ffe0e0' }]}>
            <Ionicons name="swap-horizontal" size={20} color="#ff5050" />
          </View>
        }
        title="交易記錄"
        onPress={() => console.log('Navigate to transactions')}
      />

      <SettingItem
        icon={
          <View style={[styles.iconContainer, { backgroundColor: '#e0f0ff' }]}>
            <Ionicons name="settings" size={20} color="#50a0ff" />
          </View>
        }
        title="系統設定"
        onPress={() => console.log('Navigate to settings')}
      />

      <SettingItem
        icon={
          <View style={[styles.iconContainer, { backgroundColor: '#e0ffe0' }]}>
            <Ionicons name="shield" size={20} color="#50c050" />
          </View>
        }
        title="資料隱私"
        onPress={() => console.log('Navigate to data privacy')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
});

export default SettingsList;
