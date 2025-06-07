import { borders } from './borders';
import { colors } from './color';
import { shadows } from './shadows';

export const theme = {
  colors,
  shadows,
  borders,
};

export type Theme = typeof theme;
