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
    name: '初始現金水位',
    route: '/cash-flow-initialize',
  },
  {
    name: '現金水位預測',
    route: '/cash-flow-predict',
  },
  {
    name: '稅收比',
    route: '/tax-saving-gap',
  },
  {
    name: '手動建發票',
    route: '/create-invoice-manual',
  },
  {
    name: '設定',
    route: '/settings',
  },
  {
    name: '廠商名列表',
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
    name: '現金水位',
    title: '現金水位',
    icon: require('@/assets/icons/chartPieSlice.png'),
    route: '/cash-flow-predict',
  },
  {
    name: '稅收比',
    title: '稅收比',
    icon: require('@/assets/icons/chartPieSlice.png'),
    route: '/tax-saving-gap',
  },
];

// 菜單項目數據
export const menuItems: MenuItem[] = [
  {
    id: '0',
    title: '手動建發票',
    icon: 'document-text',
    color: '#3F51B5',
    url: '/create-invoice-manual',
  },
  {
    id: '1',
    title: '初始現金水位',
    icon: 'document-text',
    color: '#3F51B5',
    url: '/cash-flow-initialize',
  },
  {
    id: '2',
    title: '現金水位預測',
    icon: 'document-text',
    color: '#3F51B5',
    url: '/cash-flow-predict',
  },
  {
    id: '3',
    title: '稅收比',
    icon: 'document-text',
    color: '#3F51B5',
    url: '/tax-saving-gap',
  },
  {
    id: '3',
    title: '廠商名列表',
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
