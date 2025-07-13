import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TagProps {
  tags: Array<{ id: string; name: string }>;
}

export function TagList({ tags }: TagProps) {
  return (
    <View style={styles.tagRow}>
      {tags.map(tag => (
        <View key={tag.id} style={styles.tag}>
          <Text style={styles.tagText}>{tag.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#e3e7fa',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    color: '#3F51B5',
    fontSize: 13,
    fontWeight: '500',
  },
});
