import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

export interface TabConfig {
  name: string;
  title?: string;
  route: string;
}

export interface BottomTabConfig {
  name: string;
  title: string;
  icon: any;
  route: string;
}

export interface MenuItem {
  id: string;
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  color: string;
  url: string;
}

export const tabConfig: TabConfig[] = [
  {
    name: '首頁',
    route: '/',
  },
  {
    name: '應收帳款',
    route: '/accounts-receivable',
  },
  {
    name: '掃描',
    route: '/scanner',
  },
  {
    name: '應付帳款',
    route: '/accounts-payable',
  },
  {
    name: '收益報告',
    route: '/invoice-report',
  },
  {
    name: '手動創建發票發票',
    route: '/create-invoice-manual',
  },
  {
    name: '設定',
    route: '/settings',
  },
  {
    name: '公司列表',
    route: '/companies-overview',
  },
  {
    name: '公司管理',
    route: '/company-overview',
  },
];

export const bottomTabConfig: BottomTabConfig[] = [
  {
    name: '首頁',
    title: '首頁',
    icon: require('@/assets/icons/home.png'),
    route: '/',
  },
  {
    name: '應收帳款',
    title: '應收帳款',
    icon: require('@/assets/icons/pig.png'),
    route: '/accounts-receivable',
  },
  {
    name: '掃描',
    title: '掃描',
    icon: require('@/assets/icons/scanner.png'),
    route: '/scanner',
  },
  {
    name: '應付帳款',
    title: '應付帳款',
    icon: require('@/assets/icons/money.png'),
    route: '/accounts-payable',
  },
  {
    name: '收益報告',
    title: '收益報告',
    icon: require('@/assets/icons/chartPieSlice.png'),
    route: '/invoice-report',
  },
];

// 菜單項目數據
export const menuItems: MenuItem[] = [
  {
    id: '0',
    title: '手動創建',
    icon: 'document-text',
    color: '#3F51B5',
    url: '/create-invoice-manual',
  },
  {
    id: '1',
    title: '公司列表',
    icon: 'document-text',
    color: '#3F51B5',
    url: '/companies-overview',
  },
  {
    id: '2',
    title: '應付帳款',
    icon: 'document-text',
    color: '#3F51B5',
    url: '/accounts-payable',
  },
  {
    id: '3',
    title: '收益報告',
    icon: 'document-text',
    color: '#3F51B5',
    url: '/invoice-report',
  },
  {
    id: '4',
    title: '設定',
    icon: 'document-text',
    color: '#3F51B5',
    url: '/settings',
  },
];
