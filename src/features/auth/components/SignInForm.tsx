'use client';

import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { DefaultButton } from '@/components/buttons/DefaultButton';
import { Links } from '@/configs/links';
import { login } from '@/features/auth/actions';
import { Anchor, Divider, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';

export const SignInForm = () => {
  return (
    <form>
      <Stack gap='md' w={400}>
        <Title order={2} ta='center' c={'black'}>
          サインイン
        </Title>

        <TextInput label='メールアドレス' name='email' type='email' placeholder='your@email.com' />

        <div>
          <Group justify='space-between'>
            <Text component='label' htmlFor='your-password' size='sm' c='black'>
              パスワード
            </Text>
            <Anchor href='#' size='xs'>
              パスワードを忘れた方はこちら
            </Anchor>
          </Group>
          <PasswordInput name='password' placeholder='Your password' id='your-password' />
        </div>
        <div>
          <DefaultButton type='submit' formAction={login} fullWidth color='primary'>
            サインイン
          </DefaultButton>

          <Divider label='または' labelPosition='center' my='md' />

          <GoogleSignInButton />

          <Group justify='center' mt={30} gap={0}>
            <Text size='sm' c='black'>
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
