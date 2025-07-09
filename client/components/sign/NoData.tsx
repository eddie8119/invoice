import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const NoData = () => {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={64} color="#e0e0e0" />
      <Text style={styles.emptyText}>目前沒有發票資料</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/')}
      >
        <Ionicons name="add" size={20} color="white" style={styles.addIcon} />
        <Text style={styles.addButtonText}>新增發票</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 16,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  addIcon: {
    marginRight: 4,
  },
});
