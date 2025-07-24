'use client';
import { createTheme } from '@mantine/core';

export const mantineBaseTheme = createTheme({
  black: '#333',
  colors: {
    //https://mantine.dev/colors-generator/?color=282d33
    darkBg: [
      '#f4f5f6',
      '#e7e7e7',
      '#cccccc',
      '#aeb0b2',
      '#95989c',
      '#858990',
      '#7b828a',
      '#697078',
      '#5c636c',
      '#282d33',
    ],
    //https://mantine.dev/colors-generator/?color=3d6b99
    primary: [
      '#ecf5ff',
      '#dde7f1',
      '#bacde0',
      '#94b1cf',
      '#759ac1',
      '#608bb8',
      '#5484b5',
      '#4471a0',
      '#3d6b99',
      '#2a5781',
    ],
  },
  cursorType: 'pointer',
  fontFamily: 'var(--font-roboto), var(--font-noto-sans-jp), sans-serif',
  components: {
    Title: {
      defaultProps: {
        color: '#fff',
      },
      styles: () => ({
        root: {
          color: '#fff',
        },
      }),
    },
    Text: {
      defaultProps: {
        color: '#fff',
      },
      styles: () => ({
        root: {
          color: '#fff',
        },
      }),
    },
    Anchor: {
      defaultProps: {
        color: '#1f5c99',
      },
      styles: () => ({
        root: {
          textDecoration: 'none',
          color: '#1f5c99',
          transition: 'all 0.2s ease-in',
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
