import { createFormStyles } from '@/style/layouts/forms';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface DatePickerInputProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  value,
  onChange,
  label,
}) => {
  const [show, setShow] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  const { colors } = useTheme();
  const formStyles = createFormStyles(colors);

  const displayValue = value ? value : '請選擇日期';

  const handleChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS !== 'web') {
      setShow(false);
    }
    if (selectedDate) {
      setInternalDate(selectedDate);
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      onChange(`${yyyy}/${mm}/${dd}`);
    }
  };

  // Web 環境下的日期輸入處理
  const handleWebDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const selectedDate = new Date(dateValue);
      setInternalDate(selectedDate);
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      onChange(`${yyyy}/${mm}/${dd}`);
    }
  };

  // 根據平台渲染不同的日期選擇器
  const renderDatePicker = () => {
    if (Platform.OS === 'web') {
      // Web 環境使用原生 HTML 日期選擇器
      return (
        <input
          type="date"
          value={internalDate ? internalDate.toISOString().split('T')[0] : ''}
          onChange={handleWebDateChange}
          style={formStyles.datePicker}
        />
      );
    } else {
      // 原生環境使用 TouchableOpacity 和 DateTimePicker
      return (
        <>
          <TouchableOpacity
            style={[formStyles.datePicker, { width: '100%' }]}
            onPress={() => setShow(true)}
            activeOpacity={0.7}
          >
            <Text style={{ color: value ? '#222' : '#aaa', fontSize: 16 }}>
              {displayValue}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={internalDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleChange}
            />
          )}
        </>
      );
    }
  };

  return (
    <View style={{ marginBottom: 12, width: '100%', flex: 1 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      {renderDatePicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: '#666',
    fontSize: 14,
  },
});
