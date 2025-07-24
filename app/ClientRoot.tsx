// app/ClientRoot.tsx
'use client';

import { GlobalHeader } from '@/components/headers/GlobalHeader';
import { mantineBaseTheme } from '@/styles/mantine/mantineBaseTheme';
import { Box, MantineProvider } from '@mantine/core';
import { User } from '@supabase/supabase-js';
import { createContext, ReactNode } from 'react';

// UserContextを作成
export const UserContext = createContext<User | null>(null);

type Props = {
  children: ReactNode;
  user: User | null;
};

export default function ClientRoot({ children, user }: Props) {
  return (
    <MantineProvider theme={mantineBaseTheme}>
      <UserContext.Provider value={user}>
        <GlobalHeader isLoggedIn={!!user} />
        <Box component='main' mt={60} p={20} bg='#282d33' style={{ minHeight: '100dvh' }}>
          {children}
        </Box>
      </UserContext.Provider>
    </MantineProvider>
  );
}
