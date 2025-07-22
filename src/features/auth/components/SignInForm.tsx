import { Anchor, Button, Paper, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { FullScreenLoader } from '@/components/loader/FullScreenLoader';

import { Links } from '@/configs/links';
import { useAuthStore } from '@/features/auth/store';
import { sleep } from '@/utils';
import Link from 'next/link';
export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore.use.login();

  const router = useRouter();
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (v) => (!v ? 'メールアドレスは必須です' : /^\S+@\S+$/.test(v) ? null : '無効なメールアドレス'),
      password: (v) => (!v ? 'パスワードは必須です' : v.length >= 4 ? null : '4文字以上入力してください'),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setIsLoading(true); // ← ローディング開始
    await sleep(3000); // ← ダミーAPI（ここにfetchなどを入れる）
    login(values);
    setIsLoading(false); // ← ローディング終了
    router.push(Links.home);
  });

  return (
    <>
      <Paper withBorder maw={400} mt={30} p={40} radius='md' shadow='sm' w='100%'>
        <form onSubmit={handleSubmit}>
          <TextInput
            required
            key={form.key('email')}
            label='メールアドレス'
            placeholder='you@mail.com'
            radius='md'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            required
            key={form.key('password')}
            label='パスワード'
            mt='md'
            radius='md'
            {...form.getInputProps('password')}
          />
          <Button fullWidth disabled={isLoading || !form.isValid()} mt={28} radius='md' type='submit'>
            ログイン
          </Button>
          <Anchor
            component={Link}
            underline='always'
            size={'12px'}
            href={Links.auth.signup}
            mt={14}
            className='u-display--block u-align--right'
          >
            アカウントをお持ちでない方はこちら
          </Anchor>
        </form>
      </Paper>

      {isLoading && <FullScreenLoader />}
    </>
  );
};
