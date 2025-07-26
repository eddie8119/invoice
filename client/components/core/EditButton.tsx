import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const EditButton = ({ onPress }: { onPress: () => void }) => {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        editButton: {
          position: 'absolute',
          top: 4,
          right: 4,
          backgroundColor: colors.primaryMainBlue,
          width: 38,
          height: 38,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        },
      }),
    [colors]
  );

  return (
    <TouchableOpacity style={styles.editButton} onPress={onPress}>
      <Ionicons name="pencil" size={24} color="#FFF" />
    </TouchableOpacity>
  );
};
