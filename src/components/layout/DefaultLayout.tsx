import { Box } from '@mantine/core';
import { ReactNode } from 'react';

import { GlobalHeader } from '@/components/headers/GlobalHeader';

type Props = {
  children: ReactNode;
};
export const DefaultLayout = ({ children }: Props) => {
  return (
    <Box
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100vh',
      }}
    >
      <GlobalHeader />
      {children}
    </Box>
  );
};
