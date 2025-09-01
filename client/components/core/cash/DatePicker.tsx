import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface DatePickerProps {
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onDateRangeChange,
}) => {
  const { colors } = useTheme();

  // 設定初始日期範圍（預設為當月第一天到最後一天）
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState<Date>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date>(lastDayOfMonth);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // 格式化日期顯示
  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 處理日期變更
  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);

      // 如果開始日期晚於結束日期，則更新結束日期
      if (selectedDate > endDate) {
        setEndDate(selectedDate);
      }

      // 通知父組件日期範圍已變更
      if (onDateRangeChange) {
        onDateRangeChange(
          selectedDate,
          selectedDate > endDate ? selectedDate : endDate
        );
      }
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      // 確保結束日期不早於開始日期
      if (selectedDate >= startDate) {
        setEndDate(selectedDate);

        // 通知父組件日期範圍已變更
        if (onDateRangeChange) {
          onDateRangeChange(startDate, selectedDate);
        }
      } else {
        // 如果選擇的結束日期早於開始日期，則將兩者都設為選擇的日期
        setStartDate(selectedDate);
        setEndDate(selectedDate);

        if (onDateRangeChange) {
          onDateRangeChange(selectedDate, selectedDate);
        }
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={styles.title}>發票日期區間</Text>

      <View style={styles.dateRangeContainer}>
        {/* 開始日期選擇器 */}
        <View style={styles.datePickerWrapper}>
          <Text style={styles.dateLabel}>開始日期</Text>
          <TouchableOpacity
            style={[styles.dateButton, { borderColor: colors.border }]}
            onPress={() => setShowStartPicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(startDate)}</Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleStartDateChange}
              minimumDate={new Date(2020, 0, 1)}
              maximumDate={new Date(2030, 11, 31)}
            />
          )}
        </View>

        <Text style={styles.separator}>至</Text>

        {/* 結束日期選擇器 */}
        <View style={styles.datePickerWrapper}>
          <Text style={styles.dateLabel}>結束日期</Text>
          <TouchableOpacity
            style={[styles.dateButton, { borderColor: colors.border }]}
            onPress={() => setShowEndPicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(endDate)}</Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleEndDateChange}
              minimumDate={startDate}
              maximumDate={new Date(2030, 11, 31)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  datePickerWrapper: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  dateButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
  },
  separator: {
    marginHorizontal: 8,
    fontSize: 16,
  },
});
