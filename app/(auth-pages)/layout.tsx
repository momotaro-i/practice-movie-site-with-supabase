'use client';

import '@/styles/globals.scss';
import { Box } from '@mantine/core';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

export default function AuthLayout({ children }: Props) {
  return (
    <Box
      style={{
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {children}
    </Box>
  );
}
