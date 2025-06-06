import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ScanPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, setMediaPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status: mediaStatus } =
          await MediaLibrary.requestPermissionsAsync();
        setMediaPermission(mediaStatus === 'granted');
      } catch (error) {
        console.error('Error requesting permissions:', error);
        setMediaPermission(false);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current) {
      Alert.alert('錯誤', '相機未準備就緒');
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      });
      setCapturedImage(photo.uri);
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('錯誤', '拍照時發生錯誤，請重試');
    }
  };

  const pickImage = async () => {
    try {
      // 檢查權限
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('錯誤', '需要相簿權限才能選擇圖片');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('錯誤', '選擇圖片時發生錯誤，請重試');
    }
  };

  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  const resetCamera = () => {
    setCapturedImage(null);
  };

  const confirmImage = () => {
    if (capturedImage) {
      // 這裡可以添加確認使用圖片的邏輯
      Alert.alert('成功', '圖片已確認');
      // 例如：導航到下一個頁面或處理圖片
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>請求權限中...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>需要相機權限</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>授權相機</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '掃描發票',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
        }}
      />

      {capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.preview} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={resetCamera}>
              <Text style={styles.buttonText}>重新拍攝</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={confirmImage}
            >
              <Text style={styles.buttonText}>確認使用</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={cameraType}
            flash={flash}
          >
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleFlash}
              >
                <Text style={styles.iconText}>
                  {flash === 'off' ? '💡' : '✨'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.scanFrame}>
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
              <View style={styles.scanLine} />
            </View>
          </CameraView>

          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
              <Text style={styles.iconText}>相簿</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.historyButton}
              onPress={() => {
                // 添加查看歷史記錄的邏輯
                Alert.alert('功能開發中', '歷史記錄功能即將推出');
              }}
            >
              <Text style={styles.iconText}>歷史</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  controlsContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  scanFrame: {
    position: 'absolute',
    top: height * 0.2,
    left: width * 0.1,
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#00ff00',
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#00ff00',
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#00ff00',
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#00ff00',
  },
  scanLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00ff00',
    opacity: 0.8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  galleryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 15,
    minWidth: 60,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'transparent',
    borderRadius: 40,
    padding: 5,
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  historyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 15,
    minWidth: 60,
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#00ff00',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  iconText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});
