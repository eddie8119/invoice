import { theme } from '@/constants/theme';

export const createShadow = (elevation = 1) => {
  return {
    shadowColor: theme.colors.light.text,
    shadowOffset: { width: 0, height: elevation },
    shadowOpacity: 0.1,
    shadowRadius: elevation * 2,
    elevation,
  };
};

export const createBorder = (color = theme.colors.light.border, width = 1) => {
  return {
    borderWidth: width,
    borderColor: color,
  };
};
