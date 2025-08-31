import { DeleteModal } from '@/components/Modal/DeleteModal';
import { EditInvoiceModal } from '@/components/Modal/EditInvoiceModal';
import { EditButton } from '@/components/core/EditButton';
import { Heading } from '@/components/core/Heading';
import Loading from '@/components/core/Loading';
import { InvoiceBaseInfo } from '@/components/invoice/InvoiceBaseInfo';
import { InvoiceItemsSection } from '@/components/invoice/InvoiceItemsSection';
import { NoData } from '@/components/sign/NoData';
import { theme } from '@/constants/theme';
import { useSubmit } from '@/hooks/useSubmit';
import { invoiceApi } from '@/services/api/invoice';
import { pannelStyles } from '@/style/components/pannel';
import { createContainerStyles } from '@/style/layouts/containers';
import { InvoiceDetail, InvoiceItem } from '@/types/invoice';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function InvoiceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

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
  const handleLocalEditSave = (data: {
    company: string;
    invoiceNumber: string;
    note?: string;
    dueDate?: string;
    items: InvoiceItem[];
  }) => {
    const totalAmount = data.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
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

  const { submit, isSubmitting } = useSubmit({
    apiFunc: invoiceApi.deleteInvoice,
    successMessage: '刪除發票成功',
    successRedirectPath: `/(tabs)/accounts-${invoice?.type}`,
  });

  const handleDelete = () => {
    submit(invoice?.id);
    setDeleteDialogVisible(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (!invoice) {
    return <NoData infoShow="發票" />;
  }

  return (
    <View style={styles.container}>
      <View style={containerStyles.upperSection}>
        <View>
          <EditButton
            onPress={() => {
              setEditDialogVisible(true);
            }}
            onDelete={() => {
              setDeleteDialogVisible(true);
            }}
          />
          <InvoiceBaseInfo invoice={invoice} />
        </View>
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
        visible={editDialogVisible}
        invoice={{
          ...invoice,
          company: invoice.company.name,
          invoiceItems: invoice.items,
        }}
        onClose={() => setEditDialogVisible(false)}
        onSave={handleLocalEditSave}
      />

      <DeleteModal
        visible={deleteDialogVisible}
        data={invoice}
        onClose={() => setDeleteDialogVisible(false)}
        onSubmit={handleDelete}
        isSubmitting={isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  noteText: {
    fontSize: 14,
    color: theme.colors.light.text,
    fontStyle: 'italic',
  },
});
