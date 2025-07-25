import { LabelText } from '@/components/core/LabelText';
import { createFormStyles } from '@/style/layouts/forms';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type DropdownOption = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  label?: string;
  options: DropdownOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
  placeholder?: string;
};

const CustomDropdown = ({
  label,
  options,
  selectedValue,
  onValueChange,
  error,
  placeholder = '選擇...',
}: CustomDropdownProps) => {
  const { colors } = useTheme();
  const formStyles = createFormStyles(colors);

  // 找到選中項目的標籤
  const selectedLabel =
    options.find(opt => opt.value === selectedValue)?.label || placeholder;

  return (
    <>
      {label && <LabelText label={label} />}
      <View style={[formStyles.pickerDisplay, error ? formStyles.error : {}]}>
        {/* 顯示選中的值（僅用於視覺效果） */}
        <View style={styles.selectedDisplay}>
          <Text style={[styles.selectedText]}>{selectedLabel}</Text>
        </View>

        {/* 實際的 Picker 元件（透明覆蓋在上方） */}
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={[formStyles.picker]}
          dropdownIconColor="transparent"
        >
          {!selectedValue && <Picker.Item label={placeholder} value="" />}
          {options.map(option => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>

        <Ionicons name="chevron-down" style={formStyles.pickerChevron} />
      </View>

      {error && <Text style={formStyles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  selectedDisplay: {
    position: 'absolute',
    top: 4,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    pointerEvents: 'none', // 讓點擊事件穿透到下方的 Picker
  },
  selectedText: {
    fontSize: 16,
    color: '#4a6462',
  },
});

export default CustomDropdown;
