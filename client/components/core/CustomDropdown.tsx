import { createFormStyles } from '@/style/layouts/forms';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

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
  const theme = useTheme();
  const formStyles = createFormStyles(theme.colors);

  // 找到選中項目的標籤
  const selectedLabel =
    options.find(opt => opt.value === selectedValue)?.label || placeholder;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.pickerContainer,
          formStyles.pickerWrapper,
          error ? formStyles.error : {},
        ]}
      >
        {/* 顯示選中的值（僅用於視覺效果） */}
        <View style={styles.selectedDisplay}>
          <Text
            style={[
              styles.selectedText,
              !selectedValue ? styles.placeholderText : {},
            ]}
          >
            {selectedLabel}
          </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    position: 'relative',
    height: 48,
    ...Platform.select({
      web: {
        zIndex: 10, // 確保 web 上 picker 在最上層
      },
    }),
  },
  selectedDisplay: {
    position: 'absolute',
    top: 0,
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
  placeholderText: {
    color: '#999',
  },
  chevron: {
    fontSize: 14,
    color: '#4a6462',
  },
});

export default CustomDropdown;
