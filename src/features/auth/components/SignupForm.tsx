'use client';

import { DefaultButton } from '@/components/buttons/DefaultButton';
import { Links } from '@/configs/links';
import { signup } from '@/features/auth/actions';
import { showSuccessNotification } from '@/utils/notifications';
import { Anchor, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const SignupForm = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('send') === 'true') {
      showSuccessNotification('確認メールを送信しました。\nメールに記載されたURLからサインインしてください。');
    }
  }, [searchParams]);
  return (
    <form>
      <Stack gap='md' w={400}>
        <Title order={2} ta='center' c='black'>
          新規登録
        </Title>

        <TextInput label='メールアドレス' name='email' type='email' placeholder='your@email.com' required />

        <div>
          <Text component='label' htmlFor='password' size='sm' c='black'>
            パスワード
          </Text>
          <PasswordInput placeholder='パスワードを入力' id='password' name='password' required />
        </div>

        <div>
          <Text component='label' htmlFor='confirm-password' size='sm' c='black'>
            パスワード確認
          </Text>
          <PasswordInput placeholder='パスワードを再入力' id='confirm-password' name='confirmPassword' required />
        </div>

        <div>
          <DefaultButton type='submit' formAction={signup} fullWidth color='primary'>
            新規登録
          </DefaultButton>

          <Group justify='center' mt={30} gap={0}>
            <Text size='sm' c='black'>
              アカウントをお持ちの方は
            </Text>
            <Anchor href={Links.auth.signin} size='sm'>
              こちら
            </Anchor>
          </Group>
        </div>
      </Stack>
    </form>
  );
};
