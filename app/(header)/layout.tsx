'use client';
import { Box } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { ReactNode, useContext } from 'react';

import '@/styles/globals.scss';

import { UserContext } from '@/components/auth/UserProvider';
import { GlobalHeader } from '@/components/headers/GlobalHeader';

type Props = {
  children: ReactNode;
};

const WithHeaderLayout = ({ children }: Props) => {
  const user = useContext(UserContext);

  return (
    <>
      <GlobalHeader isLoggedIn={!!user} />
      <Box bg='#282d33' component='main' mt={60} p={20} style={{ minHeight: '100dvh' }}>
        <Notifications />
        {children}
      </Box>
    </>
  );
};

export default WithHeaderLayout;
