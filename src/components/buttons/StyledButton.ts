import { createTheme, MantineTheme } from '@mantine/core';

type ButtonStyleParams = {
  color?: string;
};

type ButtonStyleContext = {
  variant?: string;
};

export const buttonTheme = createTheme({
  components: {
    Button: {
      styles: (theme: MantineTheme, params: ButtonStyleParams, context: ButtonStyleContext) => {
        const { variant = 'filled' } = context;
        const color = params.color || 'primary';

        const colorVars = {
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

        const current = colorVars[color as keyof typeof colorVars];
        if (!current) return {};

        switch (variant) {
          case 'filled':
            return {
              root: {
                backgroundColor: current.base,
                color: current.text,
                '@media (hover: hover)': {
                  '&:hover': {
                    backgroundColor: 'red!important',
                  },
                },
              },
            };
          case 'outline':
            return {
              root: {
                backgroundColor: 'transparent',
                color: current.base,
                border: `1px solid ${current.base}`,
                '@media (hover: hover)': {
                  '&:hover': {
                    backgroundColor: current.hover,
                  },
                },
              },
            };
          case 'subtle':
            return {
              root: {
                backgroundColor: 'transparent',
                color: current.base,
                '@media (hover: hover)': {
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
                },
              },
            };
          default:
            return {};
        }
      },
    },
  },
});
