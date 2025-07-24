// app/ClientRoot.tsx
'use client';

import { GlobalHeader } from '@/components/headers/GlobalHeader';
import { mantineBaseTheme } from '@/styles/mantine/mantineBaseTheme';
import { Box, MantineProvider } from '@mantine/core';
import { User } from '@supabase/supabase-js';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  user: User | null;
};

export default function ClientRoot({ children, user }: Props) {
  return (
    <MantineProvider theme={mantineBaseTheme}>
      <GlobalHeader isLoggedIn={!!user} />
      <Box component='main' p={20} bg='#282d33' style={{ minHeight: 'calc(100vh - 60px)' }}>
        {children}
      </Box>
    </MantineProvider>
  );
}
