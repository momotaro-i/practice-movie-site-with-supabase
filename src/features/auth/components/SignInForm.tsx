'use client';

import { login } from '@/features/auth/actions';
import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const SignInForm = () => {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <form>
      <Stack gap='md' w={400}>
        <Title order={2} ta='center'>
          ログイン
        </Title>

        <TextInput label='メールアドレス' name='email' type='email' placeholder='your@email.com' required />

        <PasswordInput label='Confirm password' defaultValue='secret' visible={visible} onVisibilityChange={toggle} />
        <Button type='submit' formAction={login} fullWidth>
          ログイン
        </Button>
      </Stack>
    </form>
  );
};
