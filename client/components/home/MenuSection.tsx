import { menuItems } from '@/constants/navigation';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// 菜單項目組件
const MenuItemComponent = ({ title, icon, color, url }: MenuItem) => {
  const router = useRouter();

  const handlePress = () => {
    if (url) {
      // @ts-ignore - 暫時忽略 router.push 類型錯誤，因為 url 可能是多種格式
      router.push(url);
    }
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const MenuSection: React.FC = () => {
  return (
    <View>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <MenuItemComponent
            id={item.id}
            title={item.title}
            icon={item.icon}
            color={item.color}
            url={item.url}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={5}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    width: '20%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuItemText: {
    fontSize: 12,
    color: theme.colors.light.text,
  },
});
