import { UserData } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProfileSectionProps {
  user: UserData | null;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  return (
    <View style={styles.profileSection}>
      <View style={styles.profileImageContainer}>
        {/* <Image
          source={require('@/assets/images/default-avatar.png')}
          style={styles.profileImage}
          defaultSource={require('@/assets/images/default-avatar.png')}
        /> */}
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>
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
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5050ff',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
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
