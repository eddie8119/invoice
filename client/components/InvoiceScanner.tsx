import TextRecognition from '@react-native-ml-kit/text-recognition';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface InvoiceData {
  companyName: string;
  date: string;
  items: {
    name: string;
    amount: number;
    quantity: number;
    totalPrice: number;
  }[];
  totalAmount: number;
}

interface Props {
  onScanComplete: (data: InvoiceData) => void;
}

export default function InvoiceScanner({ onScanComplete }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
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

      // 使用 ML Kit 識別文字
      const result = await TextRecognition.recognize(manipulatedImage.uri);
      const text = result.blocks.map(block => block.text).join('\n');

      // Parse OCR result
      const data = parseInvoiceText(text);
      onScanComplete(data);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setProcessing(false);
    }
  };

  const parseInvoiceText = (text: string): InvoiceData => {
    // This is a basic implementation - you'll need to enhance this based on your invoice format
    const lines = text.split('\n');
    const data: InvoiceData = {
      companyName: '',
      date: '',
      items: [],
      totalAmount: 0,
    };

    let currentSection = '';

    lines.forEach(line => {
      // Try to find company name (usually in the first few lines)
      if (!data.companyName && line.length > 5) {
        data.companyName = line.trim();
      }

      // Try to find date (looking for common date formats)
      if (!data.date) {
        const dateMatch = line.match(/\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/);
        if (dateMatch) {
          data.date = dateMatch[0];
        }
      }

      // Try to find items and prices
      const priceMatch = line.match(/\$?\s*(\d+([,.]\d{2})?)/);
      const quantityMatch = line.match(/x\s*(\d+)/i);

      if (priceMatch && line.length > 10) {
        const price = parseFloat(priceMatch[1].replace(',', ''));
        const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
        const name = line
          .replace(priceMatch[0], '')
          .replace(quantityMatch?.[0] ?? '', '')
          .trim();

        if (name) {
          data.items.push({
            name,
            amount: price,
            quantity,
            totalPrice: price * quantity,
          });
        }
      }
    });

    // Calculate total amount
    data.totalAmount = data.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    return data;
  };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({
        quality: 1,
        base64: true,
      });
      await processImage(photo.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={ref => setCamera(ref)}
        style={styles.camera}
        type={Camera.Constants.Type.back}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}
            disabled={processing}
          >
            <Text style={styles.text}>{processing ? '處理中...' : '拍照'}</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 15,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
