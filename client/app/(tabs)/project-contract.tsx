import { ButtonText } from '@/components/core/ButtonText';
import Loading from '@/components/core/Loading';
import { EditContractModal } from '@/components/Modal/EditContractModal';
import { t } from '@/i18n';
import { contractApi } from '@/services/api/contract';
import { createContainerStyles } from '@/style/layouts/containers';
import { ContractDTO } from '@/types/contract';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProjectContract() {
  const [editContractModalVisible, setEditContractModalVisible] =
    useState(false);
  const [contracts, setContracts] = useState<ContractDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  useEffect(() => {
    const fetchContracts = async () => {
      const res = await contractApi.getContracts();
      if (res.success && res.data) {
        setContracts(res.data);
        setLoading(false);
      } else {
        setError(t('sign.error.fetchContracts'));
        setLoading(false);
      }
    };
    fetchContracts();
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
    <>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={containerStyles.upperSection}>
          <ButtonText
            style={[
              { alignSelf: 'flex-end' },
              { backgroundColor: colors.primaryMainBlue, width: '100%' },
            ]}
            text="建立合約費用"
            variant="filled"
            size="medium"
            onPress={() => {
              setEditContractModalVisible(!editContractModalVisible);
            }}
          />
        </View>
        <View style={containerStyles.lowerSection}></View>
      </ScrollView>

      <EditContractModal
        type="create"
        visible={editContractModalVisible}
        onClose={() => setEditContractModalVisible(false)}
      />
    </>
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
