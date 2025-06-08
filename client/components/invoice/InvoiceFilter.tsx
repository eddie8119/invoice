import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FilterOption = '所有' | '已付' | '未付' | '逾期';

interface InvoiceFilterProps {
  onFilterChange: (filter: FilterOption) => void;
}

export const InvoiceFilter = ({ onFilterChange }: InvoiceFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('所有');
  const colors = theme.colors.light;

  const filters: FilterOption[] = ['所有', '已付', '未付', '逾期'];

  const handleFilterPress = (filter: FilterOption) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => handleFilterPress(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && { color: 'white' },
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.sortButton}>
        <Ionicons name="funnel-outline" size={20} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: theme.colors.light.primaryLight,
    borderRadius: 20,
    padding: 5,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  sortButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
