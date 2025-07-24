import LanguageSwitchModal from '@/components/Modal/LanguageSwitchModal';
import i18n from '@/i18n';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import SettingItem from './SettingItem';

function renderIcon(name: string, iconColor: string, bgColor: string) {
  return (
    <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
      <Ionicons name={name} size={20} color={iconColor} />
    </View>
  );
}

const SettingsList: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState<'zh-TW' | 'en'>(
    i18n.locale === 'zh-TW' ? 'zh-TW' : 'en'
  );

  const handleSelectLang = (lang: 'en' | 'zh-TW') => {
    setCurrentLang(lang);
    i18n.locale = lang;
    setLangModalVisible(false);
  };

  const settings = [
    {
      icon: renderIcon('language', '#50a0ff', '#e0f0ff'),
      title: '切換語言',
      onPress: () => setLangModalVisible(true),
      rightElement: (
        <View style={{ marginRight: 4 }}>
          <Ionicons
            name={
              currentLang === 'zh-TW'
                ? ('flag' as any)
                : ('flag-outline' as any)
            }
            size={18}
            color={currentLang === 'zh-TW' ? '#5050ff' : '#888'}
          />
        </View>
      ),
    },
    {
      icon: renderIcon('moon', '#5050ff', '#e0e0ff'),
      title: '深色模式',
      showArrow: false,
      rightElement: (
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#d1d1d1', true: '#5050ff' }}
          thumbColor="#fff"
        />
      ),
    },
    {
      icon: renderIcon('person', '#ffb050', '#fff0e0'),
      title: '帳戶與安全',
      onPress: () => console.log('Navigate to account & security'),
    },
    {
      icon: renderIcon('card', '#50c050', '#e0ffe0'),
      title: '銀行與卡片',
      onPress: () => console.log('Navigate to bank & cards'),
    },
    {
      icon: renderIcon('swap-horizontal', '#ff5050', '#ffe0e0'),
      title: '交易記錄',
      onPress: () => console.log('Navigate to transactions'),
    },
    {
      icon: renderIcon('settings', '#50a0ff', '#e0f0ff'),
      title: '系統設定',
      onPress: () => console.log('Navigate to settings'),
    },
    {
      icon: renderIcon('shield', '#50c050', '#e0ffe0'),
      title: '資料隱私',
      onPress: () => console.log('Navigate to data privacy'),
    },
  ];

  return (
    <>
      <View style={styles.settingsSection}>
        {settings.map((item, idx) => (
          <SettingItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            onPress={item.onPress}
            showArrow={item.showArrow}
            rightElement={item.rightElement}
          />
        ))}
      </View>
      <LanguageSwitchModal
        visible={langModalVisible}
        onClose={() => setLangModalVisible(false)}
        onSelect={handleSelectLang}
        currentLang={currentLang}
      />
    </>
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
