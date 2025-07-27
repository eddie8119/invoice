import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const EditButton = ({
  onPress,
  onDelete,
}: {
  onPress: () => void;
  onDelete: () => void;
}) => {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'absolute',
          top: 4,
          right: 4,
          flexDirection: 'row',
          zIndex: 10,
        },
        deleteButton: {
          borderColor: colors.error,
          borderWidth: 1,
          width: 38,
          height: 38,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8,
        },
        editButton: {
          backgroundColor: colors.primaryMainBlue,
          width: 38,
          height: 38,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Ionicons name="trash" size={22} color={colors.error} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton} onPress={onPress}>
        <Ionicons name="pencil" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};
