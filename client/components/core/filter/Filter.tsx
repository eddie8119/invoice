import { theme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type FilterOption = string;

export interface FilterProps {
  options: FilterOption[];
  active: FilterOption;
  onChange: (filter: FilterOption) => void;
  rightIcon?: React.ReactNode;
}

export const Filter = ({
  options,
  active,
  onChange,
  rightIcon,
}: FilterProps) => {
  const colors = theme.colors.light;

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterButton,
              active === option && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => onChange(option)}
          >
            <Text
              style={[
                styles.filterText,
                active === option && { color: 'white' },
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {rightIcon && (
        <TouchableOpacity style={styles.sortButton}>{rightIcon}</TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
