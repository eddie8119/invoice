import TextRecognition from '@react-native-ml-kit/text-recognition';
import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const InvoiceScanner: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (!cameraRef.current || isProcessing) return;

    setIsProcessing(true);
    try {
      // 拍照
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
      });

      // 執行 OCR
      const result = await TextRecognition.recognize(photo.uri);
      setRecognizedText(result.text);

      // 顯示辨識結果
      Alert.alert('辨識結果', result.text, [{ text: '確定' }]);
    } catch (error) {
      Alert.alert('錯誤', '掃描失敗，請重試', [{ text: '確定' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>需要相機權限</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type="back">
        <View style={styles.overlay}>
          <View style={styles.scanArea} />

          <TouchableOpacity
            style={[styles.button, isProcessing && styles.buttonDisabled]}
            onPress={handleCapture}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>拍照</Text>
            )}
          </TouchableOpacity>

          {recognizedText ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText} numberOfLines={3}>
                {recognizedText}
              </Text>
            </View>
          ) : null}
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 300,
    height: 400,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: 150,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 10,
  },
  resultText: {
    color: '#fff',
    fontSize: 14,
  },
});
