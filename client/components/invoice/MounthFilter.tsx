import CustomDropdown from '@/components/core/CustomDropdown';
import { LabelText } from '@/components/core/LabelText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface MonthFilterProps {
  value: string;
  onChange: (month: string) => void;
}

export const MounthFilter = ({ value, onChange }: MonthFilterProps) => {
  return (
    <View style={styles.container}>
      <LabelText label="月份" style={styles.label} />
      <View style={{ flex: 1 }}>
        <CustomDropdown
          selectedValue={value}
          onValueChange={onChange}
          options={Array.from({ length: 12 }, (_, i) => ({
            label: `${i + 1} 月`,
            value: `${i + 1}`,
          }))}
        />
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
    letterSpacing: 1,
  },
});
