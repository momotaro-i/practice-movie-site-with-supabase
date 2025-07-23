'use client';

import { DefaultButton } from '@/components/buttons/DefaultButton';
import { Links } from '@/configs/links';
import { signup } from '@/features/auth/actions';
import { Anchor, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';

export const SignupForm = () => {
  return (
    <form>
      <Stack gap='md' w={400}>
        <Title order={2} ta='center'>
          新規登録
        </Title>

        <TextInput label='メールアドレス' name='email' type='email' placeholder='your@email.com' required />

        <div>
          <Text component='label' htmlFor='password' size='sm'>
            パスワード
          </Text>
          <PasswordInput placeholder='パスワードを入力' id='password' name='password' required />
        </div>

        <div>
          <Text component='label' htmlFor='confirm-password' size='sm'>
            パスワード確認
          </Text>
          <PasswordInput placeholder='パスワードを再入力' id='confirm-password' name='confirmPassword' required />
        </div>

        <div>
          <DefaultButton type='submit' formAction={signup} fullWidth color='primary'>
            新規登録
          </DefaultButton>

          <Group justify='center' mt={40} gap={0}>
            <Text size='sm'>アカウントをお持ちの方は</Text>
            <Anchor href={Links.auth.signin} size='sm'>
              こちら
            </Anchor>
          </Group>
        </div>
      </Stack>
    </form>
  );
};
