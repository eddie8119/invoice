import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';

export const InvoiceScanScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [rawText, setRawText] = useState<string>('');

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, async response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        runOcr(uri);
      }
    });
  };

  const runOcr = async (uri: string) => {
    try {
      const results = await MlkitOcr.detectFromUri(uri);
      const fullText = results.map(block => block.text).join('\n');
      setRawText(fullText);
      const parsed = parseInvoiceText(fullText);
      setInvoiceData(parsed);
    } catch (err) {
      console.error('OCR failed:', err);
    }
  };

  const parseInvoiceText = (text: string) => {
    const companyMatch = text.match(/公司[:：]?\s*(.+)/);
    const dateMatch = text.match(
      /(日期|開立日期)[:：]?\s*(\d{4}[-\/.]\d{1,2}[-\/.]\d{1,2})/
    );
    const itemRegex =
      /項目[:：]?\s*(.+?)\s+數量[:：]?\s*(\d+)\s+單價[:：]?\s*(\d+)\s+總價[:：]?\s*(\d+)/g;

    const items = [];
    let match;
    while ((match = itemRegex.exec(text)) !== null) {
      items.push({
        name: match[1],
        quantity: parseInt(match[2], 10),
        unitPrice: parseInt(match[3], 10),
        total: parseInt(match[4], 10),
      });
    }

    return {
      company: companyMatch?.[1] || '',
      date: dateMatch?.[2] || '',
      items,
    };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ButtonText title="拍照辨識發票" onPress={handleTakePhoto} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {invoiceData && (
        <View style={styles.result}>
          <Text>公司名稱：</Text>
          <TextInput value={invoiceData.company} style={styles.input} />

          <Text>日期：</Text>
          <TextInput value={invoiceData.date} style={styles.input} />

          <Text>項目：</Text>
          {invoiceData.items.map((item: any, idx: number) => (
            <View key={idx} style={styles.itemBlock}>
              <TextInput
                value={item.name}
                style={styles.input}
                placeholder="名稱"
              />
              <TextInput
                value={item.quantity.toString()}
                style={styles.input}
                placeholder="數量"
              />
              <TextInput
                value={item.unitPrice.toString()}
                style={styles.input}
                placeholder="單價"
              />
              <TextInput
                value={item.total.toString()}
                style={styles.input}
                placeholder="總價"
              />
            </View>
          ))}
        </View>
      )}
      {rawText !== '' && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>OCR 原始文字</Text>
          <Text style={{ fontFamily: 'monospace' }}>{rawText}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 300, marginVertical: 12 },
  result: { marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    marginBottom: 8,
    borderRadius: 6,
  },
  itemBlock: { marginBottom: 16 },
});
