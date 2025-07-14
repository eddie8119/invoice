import { theme } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <ActivityIndicator
        size="large"
        color={theme.colors.light.primaryOceanBlue}
      />
      <Text className="mt-2 text-lg text-gray-500">載入中...</Text>
    </View>
  );
};

export default Loading;
