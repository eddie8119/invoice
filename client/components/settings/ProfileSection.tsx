import { EditButton } from '@/components/core/EditButton';
import { UserData } from '@/context/AuthContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProfileSectionProps {
  user: UserData | null;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  return (
    <View style={styles.profileSection}>
      <EditButton onPress={() => {}} />
      <Text style={styles.profileName}>{user?.name || '用戶名稱'}</Text>
      <Text style={styles.profileEmail}>
        {user?.email || 'user@example.com'}
      </Text>
      <Text style={styles.profilePhone}>{user?.phone || '+886 123456789'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },

  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileSection;
