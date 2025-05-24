import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

interface InvoiceItem {
  name: string;
  amount: number;
  quantity: number;
  totalPrice: number;
}

interface InvoiceData {
  companyName: string;
  date: string;
  items: InvoiceItem[];
  totalAmount: number;
}

interface Props {
  visible: boolean;
  data: InvoiceData;
  onConfirm: (data: InvoiceData) => void;
  onCancel: () => void;
}

export const InvoiceConfirmationDialog: React.FC<Props> = ({
  visible,
  data,
  onConfirm,
  onCancel,
}) => {
  const [editedData, setEditedData] = useState<InvoiceData>(data);

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ) => {
    const newItems = [...editedData.items];
    const item = { ...newItems[index] };

    if (field === 'amount' || field === 'quantity' || field === 'totalPrice') {
      item[field] = parseFloat(value) || 0;
      if (field === 'amount' || field === 'quantity') {
        item.totalPrice = item.amount * item.quantity;
      }
    } else {
      item[field] = value;
    }

    newItems[index] = item;

    setEditedData({
      ...editedData,
      items: newItems,
      totalAmount: newItems.reduce((sum, item) => sum + item.totalPrice, 0),
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>確認發票資訊</Text>

          <ScrollView style={styles.scrollView}>
            <View style={styles.section}>
              <Text style={styles.label}>公司名稱:</Text>
              <TextInput
                style={styles.input}
                value={editedData.companyName}
                onChangeText={text =>
                  setEditedData({ ...editedData, companyName: text })
                }
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>日期:</Text>
              <TextInput
                style={styles.input}
                value={editedData.date}
                onChangeText={text =>
                  setEditedData({ ...editedData, date: text })
                }
              />
            </View>

            <Text style={styles.subtitle}>項目:</Text>
            {editedData.items.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <TextInput
                  style={styles.itemInput}
                  value={item.name}
                  onChangeText={text => updateItem(index, 'name', text)}
                  placeholder="項目名稱"
                />
                <View style={styles.itemDetails}>
                  <TextInput
                    style={styles.numberInput}
                    value={item.amount.toString()}
                    onChangeText={text => updateItem(index, 'amount', text)}
                    keyboardType="numeric"
                    placeholder="單價"
                  />
                  <Text style={styles.multiply}>×</Text>
                  <TextInput
                    style={styles.numberInput}
                    value={item.quantity.toString()}
                    onChangeText={text => updateItem(index, 'quantity', text)}
                    keyboardType="numeric"
                    placeholder="數量"
                  />
                  <Text style={styles.equals}>=</Text>
                  <Text style={styles.totalPrice}>
                    ${item.totalPrice.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>總計:</Text>
              <Text style={styles.totalAmount}>
                ${editedData.totalAmount.toFixed(2)}
              </Text>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => onConfirm(editedData)}
            >
              <Text style={[styles.buttonText, styles.confirmText]}>確認</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: '80%',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  itemInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: 80,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  multiply: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  equals: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 80,
    textAlign: 'right',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmText: {
    color: 'white',
  },
});
