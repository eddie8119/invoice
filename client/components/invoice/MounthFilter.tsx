import { theme } from '@/constants/theme';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MonthFilterProps {
  value: string;
  onChange: (month: string) => void;
}

export const MounthFilter = ({ value, onChange }: MonthFilterProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>月份</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor={theme.colors.light.primary}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Picker.Item key={i + 1} label={`${i + 1} 月`} value={`${i + 1}`} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    marginRight: 10,
    // color: theme.colors.light.primary,
    letterSpacing: 1,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
    // iOS shadow
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Android elevation
    elevation: 2,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 0, // 無邊框
    borderColor: 'transparent',
  },
  picker: {
    fontSize: 16,
    color: theme.colors.light.primary,
    backgroundColor: 'transparent',
    width: '100%',
    height: 36,
    borderWidth: 0, // 無邊框
    borderColor: 'transparent',
  },
});
