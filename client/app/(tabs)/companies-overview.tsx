import { ButtonText } from '@/components/core/ButtonText';
import Loading from '@/components/core/Loading';
import { NoData } from '@/components/sign/NoData';
import { TagList } from '@/components/ui/tag';
import { t } from '@/i18n';
import { companyApi } from '@/services/api/company';
import { pannelStyles } from '@/style/components/pannel';
import { createContainerStyles } from '@/style/layouts/containers';
import { CompanyDTO } from '@/types/company';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
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

  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await companyApi.getCompanies();
      if (res.success && res.data) {
        setCompanies(res.data);
        setLoading(false);
      } else {
        setError(t('sign.error.fetchCompanies'));
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
    <View style={containerStyles.lowerSection}>
      <FlatList
        data={companies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[pannelStyles.card, { marginBottom: 12 }]}
            onPress={() => {
              router.push(`/company-overview/?id=${item.id}` as any);
            }}
          >
            <View style={styles.listItemHeader}>
              <View style={[containerStyles.iconContainer, { marginRight: 8 }]}>
                <Text style={styles.iconText}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.cases && item.cases.length > 0 && (
                    <View>
                      <TagList tags={item.cases} />
                    </View>
                  )}
                </View>
                <View>
                  {item.contactPerson && (
                    <Text style={styles.info}>👤 {item.contactPerson}</Text>
                  )}
                  {item.phone && (
                    <Text style={styles.info}>📞 {item.phone}</Text>
                  )}
                </View>
              </View>
            </View>
            <ButtonText
              style={{ width: '20%', alignSelf: 'flex-end' }}
              text={t('button.details')}
              variant="outlined"
              size="small"
              onPress={() => {
                router.push(`/company-overview/?id=${item.id}` as any);
              }}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<NoData infoShow="公司" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItemHeader: {
    flexDirection: 'row',
  },
  iconText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
});
