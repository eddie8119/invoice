import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NoDataProps {
  infoShow: string;
  redirectRoute?: string;
}

export const NoData = ({ infoShow, redirectRoute }: NoDataProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={64} color="#e0e0e0" />
      <Text style={styles.emptyText}>目前沒有{infoShow}資料</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/')}
      >
        <Text style={{ color: colors.primaryDarkBlue }}>去新增{infoShow}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});
