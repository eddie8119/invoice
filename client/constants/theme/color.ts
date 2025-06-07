// Primary colors
export const primary = {
  main: '#00A0FF', // 主要藍色
  light: '#4DB8FF', // 較淺藍色
  dark: '#0080CC', // 較深藍色
};

export const shadow = {
  main: '#7E22CE',
};

// Neutral colors
export const neutral = {
  white: '#FFFFFF',
  background: '#F5F8FA', // 背景色
  gray100: '#F0F4F8',
  gray200: '#E1E8ED',
  gray300: '#CFD8DC',
  gray400: '#B0BEC5',
  gray500: '#90A4AE',
  gray600: '#607D8B',
  gray700: '#455A64',
  gray800: '#263238',
  black: '#000000',
};

// Status colors
export const status = {
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: primary.main,
};

export const colors = {
  light: {
    // Primary
    primary: primary.main,
    primaryLight: primary.light,
    primaryDark: primary.dark,

    // Background
    background: neutral.white,
    surface: neutral.background,
    activeBackground: neutral.gray200,

    // Text
    text: neutral.gray800,
    textSecondary: neutral.gray600,
    textDisabled: neutral.gray400,

    // Border
    border: neutral.gray200,
    divider: neutral.gray100,

    // Status
    success: status.success,
    warning: status.warning,
    error: status.error,
    info: status.info,

    // Components
    buttonPrimary: primary.main,
    buttonSecondary: neutral.white,
    inputBackground: neutral.white,
    inputBorder: neutral.gray200,
    cardBackground: neutral.white,

    // Navigation
    tabIconDefault: neutral.gray400,
    tabIconSelected: primary.main,
    headerBackground: neutral.white,
  },
  dark: {
    // Primary
    primary: primary.light,
    primaryLight: primary.main,
    primaryDark: primary.dark,

    // Background
    background: neutral.gray800,
    surface: neutral.gray700,

    // Text
    text: neutral.white,
    textSecondary: neutral.gray300,
    textDisabled: neutral.gray500,

    // Border
    border: neutral.gray600,
    divider: neutral.gray700,

    // Status
    success: status.success,
    warning: status.warning,
    error: status.error,
    info: status.info,

    // Components
    buttonPrimary: primary.light,
    buttonSecondary: neutral.gray700,
    inputBackground: neutral.gray700,
    inputBorder: neutral.gray600,
    cardBackground: neutral.gray700,

    // Navigation
    tabIconDefault: neutral.gray500,
    tabIconSelected: primary.light,
    headerBackground: neutral.gray800,
  },
} as const;
