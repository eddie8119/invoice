import H3Title from '@/components/core/H3Title';
import Loading from '@/components/core/Loading';
import NotFound from '@/components/core/Loading copy';
import { EditInvoiceModal } from '@/components/invoice/EditInvoiceModal';
import { InvoiceBaseInfo } from '@/components/invoice/InvoiceBaseInfo';
import { theme } from '@/constants/theme';
import { containerStyles } from '@/style/containers';
import { pannelStyles } from '@/style/pannel';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface InvoiceDetail {
  id: string;
  invoiceNumber: string;
  company: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  createdAt: Date;
  expectPaidAt: Date;
  paidAt?: Date;
  items: InvoiceItem[];
  note?: string;
}

const AccountsReceivableDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // 模擬從 API 獲取發票詳細資訊
  useEffect(() => {
    // 實際應用中，這裡應該調用 API 獲取數據
    const fetchInvoiceDetails = async () => {
      try {
        setLoading(true);
        // 模擬 API 請求延遲
        await new Promise(resolve => setTimeout(resolve, 500));

        // 模擬發票詳細資訊
        const mockInvoice: InvoiceDetail = {
          id: id || '1',
          invoiceNumber: 'INV-2025-' + id,
          company: '台灣科技有限公司',
          amount: 12500,
          status: 'unpaid',
          createdAt: new Date('2025-05-15'),
          expectPaidAt: new Date('2025-06-15'),
          items: [
            {
              id: '1',
              name: '網站維護服務',
              quantity: 1,
              unitPrice: 8000,
              totalPrice: 8000,
            },
            {
              id: '2',
              name: '伺服器租用費用',
              quantity: 3,
              unitPrice: 1500,
              totalPrice: 4500,
            },
          ],
          note: '請於15日內付款，謝謝。',
        };

        setInvoice(mockInvoice);
      } catch (error) {
        console.error('獲取發票詳細資訊失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [id]);

  const [editVisible, setEditVisible] = useState(false);

  // 編輯完成時，更新本地 invoice 狀態
  const handleEditSave = (data: {
    company: string;
    invoiceNumber: string;
    amount: number;
    note?: string;
  }) => {
    setInvoice(prev => ({
      ...prev!,
      company: data.company,
      invoiceNumber: data.invoiceNumber,
      amount: data.amount,
      note: data.note,
    }));
  };

  // 計算總金額
  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  if (loading) {
    return <Loading />;
  }

  if (!invoice) {
    return <NotFound message="發票" />;
  }

  return (
    <View style={styles.container}>
      {/* 發票基本資訊區塊 + 編輯按鈕 */}
      <View style={[containerStyles.upperSection, { position: 'relative' }]}>
        <InvoiceBaseInfo invoice={invoice} />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 8,
            right: 32,
            zIndex: 2,
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 6,
            elevation: 2,
          }}
          onPress={() => setEditVisible(true)}
        >
          <Text
            style={{ fontSize: 18, color: theme.colors.light.primaryOceanBlue }}
          >
            ✏️
          </Text>
        </TouchableOpacity>
      </View>

      <EditInvoiceModal
        visible={editVisible}
        invoice={{
          company: invoice.company,
          invoiceNumber: invoice.invoiceNumber,
          amount: invoice.amount,
          note: invoice.note || '',
        }}
        onClose={() => setEditVisible(false)}
        onSave={handleEditSave}
      />

      <View style={pannelStyles.contentCard}>
        <ScrollView>
          {/* 發票項目明細 */}
          <View style={[pannelStyles.card, styles.section]}>
            <H3Title title="項目明細" />

            <View style={styles.itemsHeader}>
              <Text style={[styles.itemHeaderText, { flex: 2 }]}>項目名稱</Text>
              <Text
                style={[
                  styles.itemHeaderText,
                  { flex: 1, textAlign: 'center' },
                ]}
              >
                數量
              </Text>
              <Text
                style={[styles.itemHeaderText, { flex: 1, textAlign: 'right' }]}
              >
                單價
              </Text>
              <Text
                style={[styles.itemHeaderText, { flex: 1, textAlign: 'right' }]}
              >
                小計
              </Text>
            </View>

            {invoice.items.map(item => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={[styles.itemText, { flex: 2 }]}>{item.name}</Text>
                <Text
                  style={[styles.itemText, { flex: 1, textAlign: 'center' }]}
                >
                  {item.quantity}
                </Text>
                <Text
                  style={[styles.itemText, { flex: 1, textAlign: 'right' }]}
                >
                  {item.unitPrice}
                </Text>
                <Text
                  style={[styles.itemText, { flex: 1, textAlign: 'right' }]}
                >
                  {item.totalPrice}
                </Text>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>總計</Text>
              <Text style={styles.totalValue}>
                TWD$ {calculateTotal(invoice.items)}
              </Text>
            </View>
          </View>

          {/* 備註 */}
          {invoice.note && (
            <View style={[pannelStyles.card, styles.section]}>
              <H3Title title="備註" />
              <Text style={styles.noteText}>{invoice.note}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light.primary,
  },
  section: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.light.text,
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 14,
    color: theme.colors.light.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  amountContainer: {
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: theme.colors.light.textSecondary,
    marginBottom: 4,
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 16,
    color: theme.colors.light.primary,
    marginRight: 2,
  },
  amountValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.light.primaryOceanBlue,
  },
  dateInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateItem: {
    marginRight: 24,
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: theme.colors.light.textSecondary,
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    color: theme.colors.light.text,
  },
  itemsHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.light.divider,
    marginBottom: 8,
  },
  itemHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.light.textSecondary,
  },
  itemRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.light.divider,
  },
  itemText: {
    fontSize: 14,
    color: theme.colors.light.text,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.light.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.light.primaryOceanBlue,
  },
  noteText: {
    fontSize: 14,
    color: theme.colors.light.text,
    fontStyle: 'italic',
  },
});

export default AccountsReceivableDetailsScreen;
