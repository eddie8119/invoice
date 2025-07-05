import { theme } from '@/constants/theme';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Item {
  id: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

interface EditableInvoiceItemsTableProps {
  items: Item[];
  onItemChange: (index: number, field: keyof Item, value: any) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export const EditableInvoiceItemsTable: React.FC<
  EditableInvoiceItemsTableProps
> = ({ items, onItemChange, onAddItem, onRemoveItem }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>項目明細</Text>

      {items.map((item, index) => (
        <View key={item.id} style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => onRemoveItem(index)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.inputLabel}>項目名稱</Text>
          <TextInput
            style={styles.itemInput}
            value={item.title}
            onChangeText={text => onItemChange(index, 'title', text)}
            placeholder="例如：網站設計服務"
          />
          <View style={styles.numericRow}>
            <View style={styles.numericInputContainer}>
              <Text style={styles.inputLabel}>數量</Text>
              <TextInput
                style={styles.itemInput}
                value={String(item.quantity)}
                onChangeText={text => onItemChange(index, 'quantity', text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.numericInputContainer}>
              <Text style={styles.inputLabel}>單價</Text>
              <TextInput
                style={styles.itemInput}
                value={String(item.unitPrice)}
                onChangeText={text => onItemChange(index, 'unitPrice', text)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity onPress={onAddItem} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ 新增項目</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.light.divider,
  },
  inputLabel: {
    fontSize: 14,
    color: theme.colors.light.text,
    marginBottom: 6,
    fontWeight: '500',
  },
  itemInput: {
    borderWidth: 1,
    borderColor: theme.colors.light.divider,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  numericRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  numericInputContainer: {
    flex: 1,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 4,
  },
  deleteButtonText: {
    color: theme.colors.light.error,
    fontSize: 20,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: theme.colors.light.primary,
    padding: 12,
    borderRadius: 5,

    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
