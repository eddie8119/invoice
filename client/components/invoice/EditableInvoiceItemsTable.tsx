import { theme } from '@/constants/theme';
import { InvoiceItem } from '@/types/invoice';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export interface EditableInvoiceItemsTableProps {
  items: InvoiceItem[];
  onItemChange: (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export interface EditableInvoiceItemsTableProps {
  items: InvoiceItem[];
  onItemChange: (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export const EditableInvoiceItemsTable: React.FC<
  EditableInvoiceItemsTableProps
> = ({ items, onItemChange, onAddItem, onRemoveItem }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>項目明細</Text>
      {/* Table Header */}
      <View style={styles.itemRow}>
        <Text style={[styles.itemHeader, { flex: 2.5 }]}>項目名稱</Text>
        <Text style={[styles.itemHeader, { flex: 1, textAlign: 'center' }]}>
          數量
        </Text>
        <Text style={[styles.itemHeader, { flex: 1.5, textAlign: 'right' }]}>
          單價
        </Text>
        <View style={{ width: 30 }} />
        {/* For remove button */}
      </View>

      {items.map((item, index) => (
        <View key={item.id} style={styles.itemRow}>
          <TextInput
            style={[styles.itemInput, { flex: 2.5 }]}
            value={item.name}
            onChangeText={text => onItemChange(index, 'name', text)}
            placeholder="項目名稱"
          />
          <TextInput
            style={[styles.itemInput, { flex: 1, textAlign: 'center' }]}
            value={String(item.quantity)}
            onChangeText={text => onItemChange(index, 'quantity', text)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.itemInput, { flex: 1.5, textAlign: 'right' }]}
            value={String(item.price)}
            onChangeText={text => onItemChange(index, 'price', text)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => onRemoveItem(index)}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={onAddItem} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ 新增項目</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.light.divider,
    paddingTop: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: theme.colors.light.text,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemHeader: {
    fontWeight: 'bold',
    color: theme.colors.light.textSecondary,
  },
  itemInput: {
    borderWidth: 1,
    borderColor: theme.colors.light.divider,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    fontSize: 14,
    color: theme.colors.light.text,
    backgroundColor: theme.colors.light.surface,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.light.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: theme.colors.light.primary,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
