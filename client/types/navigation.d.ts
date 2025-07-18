import { colors } from '@/constants/theme/color';

export type ExtendedTheme = {
  dark: boolean;
  colors: typeof colors.light & typeof colors.dark; //件的類型同時包含了 light 模式和 dark 模式中定義的所有顏色
};

// 對 @react-navigation/native 這個函式庫做一些補充說明
declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme;
  // 將 ExtendedTheme 這個類型「注入」到 @react-navigation/native 函式庫中
}
