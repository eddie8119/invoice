export interface TabConfig {
  name: string;
  title: string;
  icon: any;
  route: string;
}

export const tabConfig: TabConfig[] = [
  {
    name: 'home',
    title: 'home',
    icon: require('@/assets/icons/home.png'),
    route: '/',
  },
  {
    name: '應收帳款',
    title: '應收帳款',
    icon: require('@/assets/icons/user.png'),
    route: '/accounts-receivable',
  },
  {
    name: 'scanner',
    title: 'scanner',
    icon: require('@/assets/icons/user.png'),
    route: '/scanner',
  },
  {
    name: '應付帳款',
    title: '應付帳款',
    icon: require('@/assets/icons/user.png'),
    route: '/accounts-payable',
  },
  {
    name: '收益報告',
    title: '收益報告',
    icon: require('@/assets/icons/user.png'),
    route: '/invoice-report',
  },
];
