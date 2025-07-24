import { EditButton } from '@/components/core/EditButton';
import { Heading } from '@/components/core/Heading';
import Loading from '@/components/core/Loading';
import { NoData } from '@/components/sign/NoData';
import { TagList } from '@/components/ui/tag';
import { t } from '@/i18n';
import { companyApi } from '@/services/api/company';
import { pannelStyles } from '@/style/components/pannel';
import { createContainerStyles } from '@/style/layouts/containers';
import { CompanyDTO } from '@/types/company';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CompanyOverview() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [company, setCompany] = useState<CompanyDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

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
    return <Loading />;
  }

  if (!company) {
    return <NoData infoShow="公司" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={containerStyles.upperSection}>
        {/* 公司基本資訊 */}
        <View style={pannelStyles.card}>
          <Text style={styles.title}>{company.name}</Text>
          <EditButton onPress={() => {}} />
          <View style={{}}>
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
        </View>
      </View>
      <ScrollView
        style={containerStyles.lowerSection}
        contentContainerStyle={{ gap: 16 }}
      >
        {/* Cases 專案列表 */}
        <View>
          <Heading level={2}>{t('title.caseList')}</Heading>
          {company.cases && company.cases.length > 0 ? (
            <TagList tags={company.cases} />
          ) : (
            <Text style={styles.info}>尚無專案</Text>
          )}
        </View>

        {/* 發票列表 */}
        <View>
          <Heading level={2}>{t('title.invoiceList')}</Heading>
          {/* 假設 company 有 invoices 屬性，否則這裡可根據實際 API 再呼叫一次 getCompanyInvoices */}
          {/* {company.invoices && company.invoices.length > 0 ? (
          <InvoiceList invoices={company.invoices} />
        ) : (
          <Text style={styles.info}>尚無發票</Text>
        )} */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
