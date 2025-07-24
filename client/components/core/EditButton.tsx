import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const EditButton = ({ onPress }: { onPress: () => void }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.editButton} onPress={onPress}>
      <Ionicons name="pencil" size={24} color="#FFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#5050ff',
    width: 38,
    height: 38,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 10,
  },
});
