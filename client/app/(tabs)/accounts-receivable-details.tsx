import { Heading } from '@/components/core/Heading';
import Loading from '@/components/core/Loading';
import NotFound from '@/components/core/Loading copy';
import { InvoiceBaseInfo } from '@/components/invoice/InvoiceBaseInfo';
import { InvoiceItemsSection } from '@/components/invoice/InvoiceItemsSection';
import { EditInvoiceModal } from '@/components/Modal/EditInvoiceModal';
import { theme } from '@/constants/theme';
import { invoiceApi } from '@/services/api/invoice';
import { pannelStyles } from '@/style/components/pannel';
import { createContainerStyles } from '@/style/layouts/containers';
import { InvoiceDetail, InvoiceItem } from '@/types/invoice';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
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
  const [editVisible, setEditVisible] = useState(false);

  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        setLoading(true);
        const response = await invoiceApi.getInvoice(id);
        if (response.success && response.data) {
          const transformedData = {
            ...response.data,
            createdAt: new Date(response.data.createdAt),
            dueDate: new Date(response.data.dueDate),
            paidAt: response.data.paidAt
              ? new Date(response.data.paidAt)
              : null,
          };
          setInvoice(transformedData);
        }
      } catch (error) {
        console.error('獲取發票詳細資訊失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [id]);

  // 編輯完成時，更新本地 invoice 狀態
  const handleEditSave = (data: {
    company: string;
    invoiceNumber: string;
    note?: string;
    dueDate?: string;
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
        dueDate: data.dueDate ? new Date(data.dueDate) : prev.dueDate,
        items: data.items,
        amount: totalAmount,
      };
    });
    setEditVisible(false);
  };

  // 計算總金額
  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  if (loading) {
    return <Loading />;
  }

  if (!invoice) {
    return <NotFound message="發票" />;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 8,
          right: 20,
          zIndex: 2,
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 6,
          elevation: 2,
        }}
      >
        <TouchableOpacity onPress={() => setEditVisible(true)}>
          <Text
            style={{ fontSize: 18, color: theme.colors.light.primaryOceanBlue }}
          >
            ✏️
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[containerStyles.upperSection, { position: 'relative' }]}>
        <InvoiceBaseInfo invoice={invoice} />
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
          ...invoice,
          company: invoice.company.name,
          invoiceItems: invoice.items,
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
