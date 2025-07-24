import { ButtonText } from '@/components/core/ButtonText';
import ProfileSection from '@/components/settings/ProfileSection';
import SettingsList from '@/components/settings/SettingsList';
import { useAuth } from '@/context/AuthContext';
import { t } from '@/i18n';
import { createContainerStyles } from '@/style/layouts/containers';
import { createFormStyles } from '@/style/layouts/forms';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );
  const formStyles = createFormStyles(colors);

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={containerStyles.upperSection}>
        <ProfileSection user={user} />
      </View>
      <View style={containerStyles.lowerSection}>
        <SettingsList />
        <ButtonText
          style={[
            formStyles.submitButton,
            { backgroundColor: colors.primaryMainBlue },
          ]}
          text={t('button.logout')}
          variant="filled"
          size="medium"
          disabled={false}
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
}
