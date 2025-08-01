'use client';

import { Anchor, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { showSuccessNotification } from '@/utils/notifications';

import { DefaultButton } from '@/components/buttons/DefaultButton';

import { Links } from '@/configs/links';
import { signup } from '@/features/auth/actions';

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
        <Title c='black' order={2} ta='center'>
          新規登録
        </Title>

        <TextInput required label='メールアドレス' name='email' placeholder='your@email.com' type='email' />

        <div>
          <Text c='black' component='label' htmlFor='password' size='sm'>
            パスワード
          </Text>
          <PasswordInput required id='password' name='password' placeholder='パスワードを入力' />
        </div>

        <div>
          <Text c='black' component='label' htmlFor='confirm-password' size='sm'>
            パスワード確認
          </Text>
          <PasswordInput required id='confirm-password' name='confirmPassword' placeholder='パスワードを再入力' />
        </div>

        <div>
          <DefaultButton fullWidth color='primary' formAction={signup} type='submit'>
            新規登録
          </DefaultButton>

          <Group gap={0} justify='center' mt={30}>
            <Text c='black' size='sm'>
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
