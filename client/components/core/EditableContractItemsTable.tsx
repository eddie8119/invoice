import { theme } from '@/constants/theme';
import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ButtonText } from './ButtonText';
import { Heading } from './Heading';

interface InstallmentItem {
  id: string;
  installmentNumber: number;
  percentage: number;
  amount: number;
  paymentDate: string;
}

interface EditableContractItemsTableProps {
  items: InstallmentItem[];
  onItemChange: (
    index: number,
    field: keyof InstallmentItem,
    value: any
  ) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export const EditableContractItemsTable: React.FC<
  EditableContractItemsTableProps
> = ({ items, onItemChange, onAddItem, onRemoveItem }) => {
  const { colors } = useTheme();

  // Ensure we always have at least 3 rows
  useEffect(() => {
    if (items.length < 3) {
      // Add rows until we have 3
      const rowsToAdd = 3 - items.length;
      for (let i = 0; i < rowsToAdd; i++) {
        onAddItem();
      }
    }
  }, [items.length, onAddItem]);

  return (
    <View style={styles.container}>
      <Heading level={3}>分期付款明細</Heading>

      <View style={styles.tableContainer}>
        {/* Scrollable Table Area */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={styles.tableScrollView}
        >
          <View>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={[styles.tableHeaderCell, styles.colInstallment]}>
                <Text style={styles.tableHeaderText}>期數</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.colPercentage]}>
                <Text style={styles.tableHeaderText}>百分比 (%)</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.colAmount]}>
                <Text style={styles.tableHeaderText}>金額</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.colDate]}>
                <Text style={styles.tableHeaderText}>付款日期</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.colAction]}>
                <Text style={styles.tableHeaderText}> </Text>
              </View>
            </View>

            {/* Table Rows */}
            {items.map((item, index) => (
              <View key={item.id} style={styles.tableRow}>
                {/* Installment Number - Display Only */}
                <View style={[styles.tableCell, styles.colInstallment]}>
                  <View style={styles.installmentNumberContainer}>
                    <Text style={styles.installmentNumberText}>
                      {index + 1}
                    </Text>
                  </View>
                </View>

                {/* Percentage */}
                <View style={[styles.tableCell, styles.colPercentage]}>
                  <TextInput
                    style={styles.tableCellInput}
                    value={
                      item.percentage === undefined
                        ? ''
                        : String(item.percentage)
                    }
                    onChangeText={text => {
                      const num = parseFloat(text);
                      onItemChange(
                        index,
                        'percentage',
                        isNaN(num) ? undefined : num
                      );
                    }}
                    keyboardType="numeric"
                    placeholder="40"
                  />
                </View>

                {/* Amount */}
                <View style={[styles.tableCell, styles.colAmount]}>
                  <TextInput
                    style={styles.tableCellInput}
                    value={item.amount === undefined ? '' : String(item.amount)}
                    onChangeText={text => {
                      const num = parseFloat(text);
                      onItemChange(
                        index,
                        'amount',
                        isNaN(num) ? undefined : num
                      );
                    }}
                    keyboardType="numeric"
                    placeholder="40000"
                  />
                </View>

                {/* Payment Date */}
                <View style={[styles.tableCell, styles.colDate]}>
                  <TextInput
                    style={styles.tableCellInput}
                    value={item.paymentDate || ''}
                    placeholder="YYYY/MM/DD"
                    onChangeText={text =>
                      onItemChange(index, 'paymentDate', text)
                    }
                  />
                </View>

                {/* Action Button */}
                <View style={[styles.tableCell, styles.colAction]}>
                  <TouchableOpacity
                    onPress={() => onRemoveItem(index)}
                    style={styles.tableDeleteButton}
                  >
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Add Button */}
      <View style={styles.addButtonContainer}>
        <ButtonText
          style={{
            backgroundColor: colors.primary,
          }}
          text={'+' + '新增期數'}
          variant="filled"
          size="small"
          onPress={onAddItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // Table styles
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.light.divider,
    alignItems: 'center',
    minHeight: 48,
    width: '100%',
  },
  tableHeaderCell: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  tableCell: {
    padding: 6,
    justifyContent: 'center',
  },
  tableActionCell: {
    width: 60,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableCellInput: {
    borderWidth: 1,
    borderColor: theme.colors.light.divider,
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  tableDeleteButton: {
    backgroundColor: theme.colors.light.error,
    borderRadius: 12,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  tableScrollView: {
    width: '100%',
    position: 'relative',
  },
  tableContainer: {
    width: '100%',
    position: 'relative',
  },
  // Column width styles
  colInstallment: {
    width: 80,
  },
  colPercentage: {
    width: 100,
  },
  colAmount: {
    width: 150, // Wider column for amount
  },
  colDate: {
    width: 150,
  },
  colAction: {
    width: 60,
  },
  installmentNumberContainer: {
    borderWidth: 1,
    borderColor: theme.colors.light.divider,
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  installmentNumberText: {
    fontSize: 14,
    textAlign: 'center',
  },
  // Legacy styles kept for reference
  deleteButton: {
    backgroundColor: theme.colors.light.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
