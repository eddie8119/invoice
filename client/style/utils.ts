import { theme } from '@/constants/theme';

export const createShadow = (elevation = 1) => {
  return {
    boxShadow: `0px ${elevation}px ${elevation * 2}px rgba(0, 0, 0, 0.1)`,
    elevation,
  };
};

export const createBorder = (color = theme.colors.light.border, width = 1) => {
  return {
    borderWidth: width,
    borderColor: color,
  };
};
