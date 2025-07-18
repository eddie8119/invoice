import { colors } from '@/constants/theme/color';

// 對 @react-navigation/native 這個函式庫做一些補充說明
declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean;
    colors: typeof colors.light & typeof colors.dark; //件的類型同時包含了 light 模式和 dark 模式中定義的所有顏色
  };
  export function useTheme(): ExtendedTheme;
}
