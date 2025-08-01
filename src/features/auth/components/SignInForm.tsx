'use client';

import { Anchor, Divider, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { showSuccessNotification } from '@/utils/notifications';

import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { DefaultButton } from '@/components/buttons/DefaultButton';

import { Links } from '@/configs/links';
import { login } from '@/features/auth/actions';

export const SignInForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('complete') === 'true') {
      showSuccessNotification('登録が完了しました。\nログインしてください。');
      // パラメータを消す
      router.replace(Links.auth.signin);
    }
  }, [searchParams]);

  return (
    <form>
      <Stack gap='md' w={400}>
        <Title c='black' order={2} ta='center'>
          サインイン
        </Title>

        <TextInput label='メールアドレス' name='email' placeholder='your@email.com' type='email' />

        <div>
          <Group justify='space-between'>
            <Text c='black' component='label' htmlFor='your-password' size='sm'>
              パスワード
            </Text>
            <Anchor href='#' size='xs'>
              パスワードを忘れた方はこちら
            </Anchor>
          </Group>
          <PasswordInput id='your-password' name='password' placeholder='Your password' />
        </div>
        <div>
          <DefaultButton fullWidth color='primary' formAction={login} type='submit'>
            サインイン
          </DefaultButton>

          <Divider label='または' labelPosition='center' my='md' />

          <GoogleSignInButton />

          <Group gap={0} justify='center' mt={30}>
            <Text c='black' size='sm'>
              まだアカウントをお持ちでないですか？
            </Text>
            <Anchor href={Links.auth.signup} size='sm'>
              新規登録
            </Anchor>
          </Group>
        </div>
      </Stack>
    </form>
  );
};
