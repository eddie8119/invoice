import { theme } from '@/constants/theme';
import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

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
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, modalStyle]}>
          {onClose && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          )}
          {title}
          <View style={[styles.contentContainer, contentContainerStyle]}>
            <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: screenHeight * 0.85,
    backgroundColor: theme.colors.light.background,
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
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
    backgroundColor: theme.colors.light.surfaceVariant,
  },
  closeButtonText: {
    fontSize: 22,
    color: theme.colors.light.onSurfaceVariant,
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
