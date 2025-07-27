import { theme } from '@/constants/theme';
import { createContainerStyles } from '@/style/layouts/containers';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  modalStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  title,
  children,
  footer,
  modalStyle,
  contentContainerStyle,
  footerContainerStyle,
}) => {
  const { colors } = useTheme();
  const containerStyles = useMemo(
    () => createContainerStyles(colors),
    [colors]
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[containerStyles.modalContainer, modalStyle]}>
          {onClose && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          )}
          {title}

          <View
            style={[
              styles.contentContainer,
              contentContainerStyle,
              { marginTop: 16, flex: 1 },
            ]}
          >
            {children}
          </View>
          {footer && (
            <View style={[styles.footerContainer, footerContainerStyle]}>
              {footer}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceVariant,
  },
  closeButtonText: {
    fontSize: 22,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 28,
    fontWeight: 'bold',
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
    width: '100%',
  },
  footerContainer: {
    marginTop: 20,
  },
});
