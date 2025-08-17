import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SummaryCard } from '@/components/core/SummaryCard';

interface InvoiceSummaryProps {
  unpaidTotal: string;
  overdueTotal: string;
}

export const InvoiceSummary = ({
  unpaidTotal,
  overdueTotal,
}: InvoiceSummaryProps) => {
  return (
    <View style={styles.container}>
      <SummaryCard 
        label="未付總額" 
        amount={unpaidTotal} 
        cardStyle={styles.card}
      />
      <SummaryCard 
        label="逾期總額" 
        amount={overdueTotal} 
        isError={true}
        cardStyle={styles.card}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginHorizontal: 4,
  }
});
