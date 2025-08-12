// app/(auth-pages)/layout.tsx
import { Card, Center } from '@mantine/core';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Center bg='darkBg.9' style={{ minHeight: '100vh' }}>
      <Card bg='#fff' p={20} style={{ width: 'fit-content' }}>
        {children}
      </Card>
    </Center>
  );
}
