import React from 'react';
import { Platform, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerInputProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, onChange, label }) => {
  const [show, setShow] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  const displayValue = value ? value : '請選擇日期';

  const handleChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setInternalDate(selectedDate);
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      onChange(`${yyyy}/${mm}/${dd}`);
    }
  };

  return (
    <View style={{ marginBottom: 12 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShow(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: value ? '#222' : '#aaa', fontSize: 16 }}>{displayValue}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={internalDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 4,
    color: '#666',
    fontSize: 14,
  },
});
