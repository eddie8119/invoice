import InvoiceForm from '@/components/InvoiceForm';
import { useCloudOCR } from '@/hooks/useCloudOCR';
import { uploadInvoiceToAppwrite } from '@/services/appwriteService';
import { pickImageAndConvertBase64 } from '@/utils/pickImage';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, View } from 'react-native';

export default function InvoiceUploadScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { result, loading, runOcr } = useCloudOCR();

  const handlePickImage = async () => {
    const res = await pickImageAndConvertBase64();
    if (res) {
      setImageUri(res.uri);
      runOcr(res.base64);
    }
  };

  const handleSubmit = async (formData: any) => {
    if (!imageUri) return;
    await uploadInvoiceToAppwrite(imageUri, formData);
    alert('成功上傳！');
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="選擇圖片" onPress={handlePickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ height: 200, marginVertical: 10 }}
        />
      )}
      {loading && <ActivityIndicator />}
      {result && <InvoiceForm defaultValues={result} onSubmit={handleSubmit} />}
    </View>
  );
}
