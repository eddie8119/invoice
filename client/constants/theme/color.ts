// Primary colors
export const primary = {
  brand_main_green: '#00D09E',
  brand_light_green: '#DFF7E2',
  brand_green_white: '#F1FFF3',
  brand_main_blue: '#3299FF',
  brand_light_blue: '#6DB6FE',
  brand_dark_blue: '#0080CC',
  brand_ocean_blue: '#0068FF',
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
  info: primary.brand_main_green,
};

export const colors = {
  light: {
    // Primary
    primary: primary.brand_main_green,
    primaryLight: primary.brand_light_green,
    primaryGreenWhite: primary.brand_green_white,
    primaryMainBlue: primary.brand_main_blue,
    primaryLightBlue: primary.brand_light_blue,
    primaryDarkBlue: primary.brand_dark_blue,
    primaryOceanBlue: primary.brand_ocean_blue,

    // Background
    background: primary.brand_main_green,
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
    buttonPrimary: primary.brand_main_green,
    buttonSecondary: neutral.white,
    inputBackground: neutral.white,
    inputBorder: neutral.gray200,
    cardBackground: neutral.white,

    // Navigation
    tabIconDefault: neutral.gray400,
    tabIconSelected: primary.brand_main_green,
    headerBackground: neutral.white,
  },
  dark: {
    // Primary
    primary: primary.brand_main_green,
    primaryLight: primary.brand_light_green,
    primaryDark: primary.brand_dark_blue,

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
    buttonPrimary: primary.brand_light_green,
    buttonSecondary: neutral.gray700,
    inputBackground: neutral.gray700,
    inputBorder: neutral.gray600,
    cardBackground: neutral.gray700,

    // Navigation
    tabIconDefault: neutral.gray500,
    tabIconSelected: primary.brand_light_green,
    headerBackground: neutral.gray800,
  },
} as const;
