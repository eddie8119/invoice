import { colors } from './color';
import { radius } from './radius';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  shadows,
  spacing,
  typography,
  radius,
};

export type Theme = typeof theme;
