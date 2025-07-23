'use client';

import { mantineButtonTheme } from '@/styles/mantine/mantineButtonTheme';
import { Button, ButtonProps, MantineProvider } from '@mantine/core';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

type CustomButtonProps = Omit<ButtonProps, 'component'> &
  ComponentPropsWithoutRef<'a'> & {
    component: 'Link' | 'a';
    color?: 'primary' | 'secondary' | 'danger' | 'default';
    href: string;
  };

export const DefaultLinkButton = ({ href, component, target, ...rest }: CustomButtonProps) => {
  const safeRel = target === '_blank' ? 'noopener noreferrer' : undefined;
  return (
    <MantineProvider theme={mantineButtonTheme}>
      {component === 'Link' ? (
        <Button component={Link} href={href} {...rest} />
      ) : (
        <Button component='a' href={href} target={target} rel={safeRel} {...rest} />
      )}
    </MantineProvider>
  );
};
