import { createTheme, defaultVariantColorsResolver, VariantColorsResolver } from '@mantine/core';

const customColorMap = {
  primary: {
    base: '#3d6b99',
    hover: '#1f5c99',
    text: '#ffffff',
  },
  secondary: {
    base: '#7a8a99',
    hover: '#5c7a99',
    text: '#ffffff',
  },
  danger: {
    base: '#e63946',
    hover: '#c5303b',
    text: '#ffffff',
  },
  default: {
    base: '#778899',
    hover: '#5c7a99',
    text: '#ffffff',
  },
};

const variantColorResolver: VariantColorsResolver = (input) => {
  const color = input.color ?? 'primary';
  const variant = input.variant ?? 'filled';

  const current = customColorMap[color as keyof typeof customColorMap];
  if (!current) {
    return defaultVariantColorsResolver(input);
  }

  switch (variant) {
    case 'filled':
      return {
        background: current.base,
        hover: current.hover,
        color: current.text,
        border: 'none',
      };
    case 'outline':
      return {
        background: 'transparent',
        color: current.base,
        border: `1px solid ${current.base}`,
        hover: current.hover,
        hoverColor: current.text,
      };
    case 'subtle':
      return {
        background: 'transparent',
        color: current.base,
        border: 'none',
        hover: 'rgba(0, 0, 0, 0.05)',
      };
    default:
      return defaultVariantColorsResolver(input);
  }
};

export const mantineButtonTheme = createTheme({
  variantColorResolver,
});
