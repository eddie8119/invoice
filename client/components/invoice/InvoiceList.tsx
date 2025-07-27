import { EditInvoiceStatusModal } from '@/components/Modal/EditInvoiceStatusModal';
import { theme } from '@/constants/theme';
import { pannelStyles } from '@/style/components/pannel';
import { textStyles } from '@/style/components/text';
import { Invoice } from '@/types/invoice';
import { getRemainingDaysMessage } from '@/utils/getRemainingDaysMessage';
import { getStatusColor, getStatusText } from '@/utils/invoice';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface InvoiceListProps {
  invoices: Invoice[];
  onInvoicePress: (invoice: Invoice) => void;
  onStatusToggle?: (invoice: Invoice) => void;
}

export const InvoiceList = ({
  invoices,
  onInvoicePress,
  onStatusToggle,
}: InvoiceListProps) => {
  const colors = theme.colors.light;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDTO | null>(
    null
  );
  const [selectedPaidAt, setSelectedPaidAt] = useState<Date>(new Date());

  const handleEditSave = (data: { paidAt: Date }) => {
    setModalVisible(false);
  };
  return (
    <View>
      <View>
        {invoices.map(invoice => (
          <TouchableOpacity
            key={invoice.id}
            style={[pannelStyles.card, { marginBottom: 12 }]}
            onPress={() => onInvoicePress(invoice)}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <View style={styles.companyInfoContainer}>
                  <Text style={styles.companyName}>{invoice.company}</Text>
                  <Text style={styles.invoiceNumber}>
                    #{invoice.invoiceNumber}
                  </Text>
                </View>
                {getRemainingDaysMessage(invoice.status, invoice.dueDate) && (
                  <View style={styles.statusContainer}>
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: getStatusColor(invoice.status) },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusMessage,
                        { color: getStatusColor(invoice.status) },
                      ]}
                    >
                      {getRemainingDaysMessage(invoice.status, invoice.dueDate)}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.cardRight}>
                <Text>
                  TWD$
                  <Text style={styles.amount}>{invoice.totalAmount}</Text>
                </Text>
                <Text>建立日期: {invoice.createdAt.toLocaleDateString()}</Text>

                <View style={styles.paidDateAndStatusContainer}>
                  {invoice.paidAt && (
                    <Text style={[styles.paidDateText]}>
                      日期: {invoice.paidAt.toLocaleDateString()}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      { backgroundColor: getStatusColor(invoice.status) },
                    ]}
                    onPress={e => {
                      // 防止事件冒泡，避免觸發父元素的 onPress
                      e.stopPropagation && e.stopPropagation();
                      setSelectedInvoice(invoice);
                      setSelectedPaidAt(invoice.paidAt || new Date());
                      setModalVisible(true);
                    }}
                  >
                    <Text style={textStyles.statusButton}>
                      {getStatusText(invoice.status)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <EditInvoiceStatusModal
        visible={modalVisible}
        invoice={selectedInvoice}
        onClose={() => setModalVisible(false)}
        onSave={handleEditSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLeft: {
    alignItems: 'flex-start', // 靠左對齊
    justifyContent: 'flex-start', // 靠上對齊
    flex: 1,
    minHeight: 60, // 可視情況調整，避免內容壓縮
  },
  companyInfoContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 0, // 不要讓公司名稱和發票編號有多餘空隙
  },
  invoiceNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 0, // 不要讓發票編號和下方有多餘空隙
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8, // 狀態訊息區塊與上方資訊的距離
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusMessage: {
    fontSize: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.light.primaryOceanBlue,
    marginBottom: 4,
  },

  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  paidDateAndStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4, // Adjust as needed for spacing
  },
  paidDateText: {
    marginRight: 8, // Add some space between paid date and status button
    // No marginBottom here as it's handled by the container's marginTop or overall cardRight padding
  },
});
