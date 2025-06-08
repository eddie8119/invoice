import { theme } from '@/constants/theme';
import { pannelStyles } from '@/style/pannel';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// 發票項目類型定義
interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// 發票詳細資訊類型
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
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const colors = theme.colors.light;

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

  // 獲取狀態顏色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return colors.success;
      case 'unpaid':
        return colors.primaryOceanBlue;
      case 'overdue':
        return colors.error;
      default:
        return colors.text;
    }
  };

  // 獲取狀態文字
  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return '已付';
      case 'unpaid':
        return '未付';
      case 'overdue':
        return '逾期';
      default:
        return status;
    }
  };

  // 計算總金額
  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>載入中...</Text>
        </View>
      </View>
    );
  }

  if (!invoice) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>找不到發票資訊</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* 發票基本資訊 */}
        <View style={[pannelStyles.card, styles.section]}>
          <View style={styles.header}>
            <View>
              <Text style={styles.companyName}>{invoice.company}</Text>
              <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(invoice.status) },
              ]}
            >
              <Text style={styles.statusText}>
                {getStatusText(invoice.status)}
              </Text>
            </View>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>總金額</Text>
            <Text style={styles.amount}>
              <Text style={styles.currency}>TWD$</Text>
              <Text style={styles.amountValue}>{invoice.amount}</Text>
            </Text>
          </View>

          <View style={styles.dateInfo}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>建立日期</Text>
              <Text style={styles.dateValue}>
                {invoice.createdAt.toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>預計付款日</Text>
              <Text style={styles.dateValue}>
                {invoice.expectPaidAt.toLocaleDateString()}
              </Text>
            </View>
            {invoice.paidAt && (
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>實際付款日</Text>
                <Text style={styles.dateValue}>
                  {invoice.paidAt.toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 發票項目明細 */}
        <View style={[pannelStyles.card, styles.section]}>
          <Text style={styles.sectionTitle}>項目明細</Text>

          <View style={styles.itemsHeader}>
            <Text style={[styles.itemHeaderText, { flex: 2 }]}>項目名稱</Text>
            <Text
              style={[styles.itemHeaderText, { flex: 1, textAlign: 'center' }]}
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
              <Text style={[styles.itemText, { flex: 1, textAlign: 'center' }]}>
                {item.quantity}
              </Text>
              <Text style={[styles.itemText, { flex: 1, textAlign: 'right' }]}>
                {item.unitPrice}
              </Text>
              <Text style={[styles.itemText, { flex: 1, textAlign: 'right' }]}>
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
            <Text style={styles.sectionTitle}>備註</Text>
            <Text style={styles.noteText}>{invoice.note}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light.primary,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.light.text,
    marginBottom: 12,
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
