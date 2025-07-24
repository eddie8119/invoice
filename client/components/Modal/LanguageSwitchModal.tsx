import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface LanguageSwitchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (lang: 'en' | 'zh-TW') => void;
  currentLang: 'en' | 'zh-TW';
}

const LanguageSwitchModal: React.FC<LanguageSwitchModalProps> = ({
  visible,
  onClose,
  onSelect,
  currentLang,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>選擇語言 / Select Language</Text>
          <TouchableOpacity
            style={[styles.option, currentLang === 'zh-TW' && styles.selected]}
            onPress={() => onSelect('zh-TW')}
          >
            <Text style={styles.optionText}>繁體中文</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, currentLang === 'en' && styles.selected]}
            onPress={() => onSelect('en')}
          >
            <Text style={styles.optionText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>取消 / Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 24,
    width: 280,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  option: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selected: {
    backgroundColor: '#e0e7ff',
    borderColor: '#5050ff',
  },
  optionText: {
    fontSize: 16,
    color: '#222',
  },
  cancelBtn: {
    marginTop: 10,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  cancelText: {
    color: '#888',
    fontSize: 14,
  },
});

export default LanguageSwitchModal;
