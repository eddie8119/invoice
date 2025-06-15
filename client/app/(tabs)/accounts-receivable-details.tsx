import { Heading } from '@/components/core/Heading';
import Loading from '@/components/core/Loading';
import NotFound from '@/components/core/Loading copy';
import { InvoiceBaseInfo } from '@/components/invoice/InvoiceBaseInfo';
import { InvoiceItemsSection } from '@/components/invoice/InvoiceItemsSection';
import { EditInvoiceModal } from '@/components/Modal/EditInvoiceModal';
import { theme } from '@/constants/theme';
import { containerStyles } from '@/style/containers';
import { pannelStyles } from '@/style/pannel';
import { InvoiceDetail, InvoiceItem } from '@/types/invoice';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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

        const mockItems: InvoiceItem[] = [
          {
            id: '1',
            name: '網站維護服務',
            quantity: 1,
            price: 8000,
          },
          {
            id: '2',
            name: '伺服器租用費用',
            quantity: 3,
            price: 1500,
          },
        ];

        // 模擬發票詳細資訊
        const mockInvoice: InvoiceDetail = {
          id: id || '1',
          invoiceNumber: 'INV-2025-' + id,
          company: '台灣科技有限公司',
          amount: mockItems.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
          ),
          status: 'unpaid',
          createdAt: new Date('2025-05-15'),
          expectPaidAt: new Date('2025-06-15'),
          items: mockItems,
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
    note?: string;
    paymentDueDate?: string;
    items: InvoiceItem[];
  }) => {
    const totalAmount = data.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setInvoice(prev => {
      if (!prev) return null;
      return {
        ...prev,
        company: data.company,
        invoiceNumber: data.invoiceNumber,
        note: data.note,
        expectPaidAt: data.paymentDueDate
          ? new Date(data.paymentDueDate)
          : prev.expectPaidAt,
        items: data.items,
        amount: totalAmount,
      };
    });
    setEditVisible(false);
  };

  // 計算總金額
  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
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

      <View style={containerStyles.lowerSection}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 項目明細 */}
          <InvoiceItemsSection
            items={invoice.items}
            calculateTotal={calculateTotal}
          />

          {/* 備註 */}
          {invoice.note && (
            <View style={[pannelStyles.card, styles.section]}>
              <Heading level={3}>備註</Heading>
              <Text style={styles.noteText}>{invoice.note}</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <EditInvoiceModal
        visible={editVisible}
        invoice={{
          company: invoice.company,
          invoiceNumber: invoice.invoiceNumber,
          note: invoice.note,
          paymentDueDate: invoice.expectPaidAt
            .toISOString()
            .split('T')[0]
            .replace(/-/g, '/'),
          items: invoice.items,
        }}
        onClose={() => setEditVisible(false)}
        onSave={handleEditSave}
      />
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
  noteText: {
    fontSize: 14,
    color: theme.colors.light.text,
    fontStyle: 'italic',
  },
});

export default AccountsReceivableDetailsScreen;
