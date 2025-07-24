// app/(auth-pages)/layout.tsx
import { Card, Center } from '@mantine/core';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Center style={{ minHeight: 'calc(100vh - 60px)' }}>
      <Card bg='#fff' p={20} style={{ width: 'fit-content' }}>
        {children}
      </Card>
    </Center>
  );
}
