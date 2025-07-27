import { theme } from '@/constants/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ButtonText } from './ButtonText';

export interface FormButtonGroupProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
}

export const FormButtonGroup: React.FC<FormButtonGroupProps> = ({
  onCancel,
  onSubmit,
  isSubmitting = false,
  isSubmitDisabled = false,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.buttonRow}>
      <ButtonText
        text={'取消'}
        variant="outlined"
        size="small"
        onPress={onCancel}
        disabled={isSubmitting}
        style={{ borderColor: colors.error, textColor: colors.error }}
      />
      {isSubmitting ? (
        <View style={styles.loadingButton}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <ButtonText
          text={'提交'}
          variant="filled"
          size="small"
          disabled={isSubmitDisabled}
          onPress={onSubmit}
          style={{ backgroundColor: colors.primaryOceanBlue }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  loadingButton: {
    backgroundColor: theme.colors.light.background,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
});
