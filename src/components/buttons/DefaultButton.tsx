'use client';

import { Button, ButtonProps, MantineProvider } from '@mantine/core';
import { ComponentPropsWithoutRef } from 'react';

import { mantineButtonTheme } from '@/styles/mantine/mantineButtonTheme';

type CustomButtonProps = ButtonProps &
  ComponentPropsWithoutRef<'button'> & {
    color?: 'primary' | 'secondary' | 'danger' | 'default';
  };
export const DefaultButton = (props: CustomButtonProps) => {
  return (
    <MantineProvider theme={mantineButtonTheme}>
      <Button
        style={{
          transition: 'all 0.2s ease-in-out',
        }}
        {...props}
      />
    </MantineProvider>
  );
};
