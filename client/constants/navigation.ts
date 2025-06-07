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
    name: 'report',
    title: 'report',
    icon: require('@/assets/icons/user.png'),
    route: '/invoice-report',
  },
  {
    name: 'scanner',
    title: 'scanner',
    icon: require('@/assets/icons/user.png'),
    route: '/scanner',
  },
  {
    name: 'upload',
    title: 'upload',
    icon: require('@/assets/icons/user.png'),
    route: '/invoice-upload',
  },
  {
    name: 'profile',
    title: 'profile',
    icon: require('@/assets/icons/user.png'),
    route: '/profile',
  },
];
