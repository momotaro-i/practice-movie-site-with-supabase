import { createTheme, defaultVariantColorsResolver, VariantColorsResolver } from '@mantine/core';

const customColorMap = {
  primary: {
    base: 'var(--primary)',
    hover: 'var(--primary-hover, #fbb93d)',
    text: 'var(--white)',
  },
  secondary: {
    base: 'var(--secondary)',
    hover: 'var(--secondary-hover, #ffdaaa)',
    text: 'var(--black)',
  },
  danger: {
    base: 'var(--danger, #ff4d4f)',
    hover: 'var(--danger-hover, #e63946)',
    text: 'var(--white)',
  },
  default: {
    base: 'var(--black)',
    hover: 'rgb(176, 176, 176)',
    text: 'var(--white)',
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
        hover: 'rgba(0, 0, 0, 0.05)',
        border: 'none',
      };
    default:
      return defaultVariantColorsResolver(input);
  }
};

export const mantineButtonTheme = createTheme({
  variantColorResolver,
});
