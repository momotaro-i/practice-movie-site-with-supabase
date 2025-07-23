import { createTheme } from '@mantine/core';

export const mantineBaseTheme = createTheme({
  colors: {
    primary: [
      '#778899', // 最も明るい色
      '#7a8a99',
      '#5c7a99',
      '#3d6b99',
      '#1f5c99',
      '#004d99', // 最も暗い色
      '#004d99',
      '#004d99',
      '#004d99',
      '#004d99',
    ],
  },
  cursorType: 'pointer',
  fontFamily: 'var(--font-roboto), var(--font-noto-sans-jp), sans-serif',
  components: {
    Title: {
      defaultProps: {
        color: '#333',
      },
      styles: () => ({
        root: {
          color: '#333',
        },
      }),
    },
    Text: {
      defaultProps: {
        color: '#333',
      },
      styles: () => ({
        root: {
          color: '#333',
        },
      }),
    },
    Anchor: {
      defaultProps: {
        color: '#1f5c99',
      },
      styles: () => ({
        root: {
          color: '#1f5c99',
          transition: 'color 0.2s ease',
        },
      }),
    },
  },
});

/* font-size
xs: 0.75rem = 12px
sm: 0.875rem = 14px
md: 1rem = 16px （デフォルト）
lg: 1.125rem = 18px
xl: 1.25rem = 20px
*/
