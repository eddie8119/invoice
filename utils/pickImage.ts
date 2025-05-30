import * as ImagePicker from 'expo-image-picker';

export async function pickImageAndConvertBase64(): Promise<{
  base64: string;
  uri: string;
} | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: true,
  });

  if (!result.canceled && result.assets[0]) {
    const asset = result.assets[0];
    return {
      base64: asset.base64!,
      uri: asset.uri,
    };
  }

  return null;
}
