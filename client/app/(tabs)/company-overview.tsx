import { TagList } from '@/components/ui/tag';
import { companyApi } from '@/services/api/company';
import { CompanyDTO } from '@/types/company';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function CompanyOverview() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [company, setCompany] = useState<CompanyDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await companyApi.getCompany(id);
      if (res.success && res.data) {
        setCompany(res.data);
      }
      setLoading(false);
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  if (!company) {
    return (
      <View style={styles.center}>
        <Text>找不到公司資料</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 公司基本資訊 */}
      <View style={styles.card}>
        <Text style={styles.title}>{company.name}</Text>
        {company.phone && (
          <Text style={styles.info}>電話：{company.phone}</Text>
        )}
        {company.address && (
          <Text style={styles.info}>地址：{company.address}</Text>
        )}
        {company.contactPerson && (
          <Text style={styles.info}>聯絡人：{company.contactPerson}</Text>
        )}
        {company.email && (
          <Text style={styles.info}>Email：{company.email}</Text>
        )}
        <Text style={styles.info}>
          建立日期：{new Date(company.createdAt).toLocaleDateString()}
        </Text>
      </View>

      {/* Cases 專案列表 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>專案列表</Text>
        {company.cases && company.cases.length > 0 ? (
          <TagList tags={company.cases} />
        ) : (
          <Text style={styles.info}>尚無專案</Text>
        )}
      </View>

      {/* 發票列表 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>發票列表</Text>
        {/* 假設 company 有 invoices 屬性，否則這裡可根據實際 API 再呼叫一次 getCompanyInvoices */}
        {/* {company.invoices && company.invoices.length > 0 ? (
          <InvoiceList invoices={company.invoices} />
        ) : (
          <Text style={styles.info}>尚無發票</Text>
        )} */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 15, color: '#444', marginBottom: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
