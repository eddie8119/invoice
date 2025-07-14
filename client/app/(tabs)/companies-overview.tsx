import Loading from '@/components/core/Loading';
import { TagList } from '@/components/ui/tag';
import { theme } from '@/constants/theme';
import { companyApi } from '@/services/api/company';
import { CompanyDTO } from '@/types/company';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CompaniesOverview() {
  const [companies, setCompanies] = useState<CompanyDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await companyApi.getCompanies();
      if (res.success && res.data) {
        setCompanies(res.data);
        setLoading(false);
      } else {
        setError('取得公司資料失敗');
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={companies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              router.push(`/company-overview/?id=${item.id}` as any);
            }}
          >
            <Text style={styles.name}>{item.name}</Text>
            {item.phone && <Text style={styles.info}>電話：{item.phone}</Text>}
            {item.cases && item.cases.length > 0 && (
              <TagList tags={item.cases} />
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>目前沒有公司資料</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.light.primary },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#3F51B5', marginBottom: 6 },
  info: { fontSize: 14, color: '#444', marginBottom: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
});
