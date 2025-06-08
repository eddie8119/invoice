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
      <Text style={styles.label}>月份：</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor="#27b4b2"
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 16,
    marginRight: 8,
    color: '#333',
  },
  pickerWrapper: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 40,
  },
});
