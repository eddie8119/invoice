import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface InvoiceItem {
  name: string;
  totalAmount: number;
  quantity: number;
  totalPrice: number;
}

interface InvoiceData {
  companyName: string;
  date: string;
  items: InvoiceItem[];
  totalAmount: number;
}

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [scannedData, setScannedData] = useState<InvoiceData | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const processImage = async (uri: string) => {
    try {
      setProcessing(true);

      // Optimize image for OCR
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1200 } }, { grayscale: true }, { contrast: 1.5 }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      // Mock OCR result for testing
      // In production, you would integrate with a real OCR service
      const mockData: InvoiceData = {
        companyName: '測試公司',
        date: new Date().toISOString().split('T')[0],
        items: [
          {
            name: '測試商品',
            totalAmount: 100,
            quantity: 2,
            totalPrice: 200,
          },
        ],
        totalAmount: 200,
      };

      setScannedData(mockData);
      router.push({
        pathname: '/confirm-invoice',
        params: { data: JSON.stringify(mockData) },
      });
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setProcessing(false);
    }
  };

  const takePicture = async () => {
    if (camera) {
      try {
        const photo = await camera.takePictureAsync({
          quality: 1,
          base64: true,
        });
        await processImage(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>請求相機權限中...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>沒有相機權限</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={ref => setCamera(ref)}
        style={styles.camera}
        type={CameraType.back}
        ratio="16:9"
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>
          <Text style={styles.guideText}>請將發票對準框框內</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, processing && styles.buttonDisabled]}
            onPress={takePicture}
            disabled={processing}
          >
            <Text style={styles.buttonText}>
              {processing ? '處理中...' : '拍照'}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 300,
    height: 400,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  messageText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  guideText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});
