'use client';

import { Button, ButtonProps, MantineProvider } from '@mantine/core';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import { mantineButtonTheme } from '@/styles/mantine/mantineButtonTheme';

type CustomButtonProps = Omit<ButtonProps, 'component'> &
  ComponentPropsWithoutRef<'a'> & {
    color?: 'primary' | 'secondary' | 'danger' | 'default';
    component: 'Link' | 'a';
    href: string;
  };

export const DefaultLinkButton = ({ component, href, target, ...rest }: CustomButtonProps) => {
  const safeRel = target === '_blank' ? 'noopener noreferrer' : undefined;
  return (
    <MantineProvider theme={mantineButtonTheme}>
      {component === 'Link' ? (
        <Button
          component={Link}
          href={href}
          style={{
            transition: 'all 0.2s ease-in-out',
          }}
          {...rest}
        />
      ) : (
        <Button
          component='a'
          href={href}
          rel={safeRel}
          target={target}
          style={{
            transition: 'all 0.2s ease-in-out',
          }}
          {...rest}
        />
      )}
    </MantineProvider>
  );
};
