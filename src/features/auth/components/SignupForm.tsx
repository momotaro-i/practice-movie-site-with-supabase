import { Anchor, Button, Group, Paper, PasswordInput, Radio, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { FullScreenLoader } from '@/components/loader/FullScreenLoader';

import { Links } from '@/configs/links';
import { TSignupFormValues, TSignupRequestValues } from '@/features/auth/types';
import { sleep } from '@/utils';
import Link from 'next/link';
export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm<TSignupFormValues, (values: TSignupFormValues) => TSignupRequestValues>({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      email: '',
      password: '',
      gender: '0',
    },
    validate: {
      email: (v) => (!v ? 'メールアドレスは必須です' : /^\S+@\S+$/.test(v) ? null : '無効なメールアドレス'),
      password: (v) => (!v ? 'パスワードは必須です' : v.length >= 4 ? null : '4文字以上入力してください'),
    },
    transformValues(values) {
      const { gender, ...rest } = values;
      return {
        ...rest,
        gender: Number(gender),
      };
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setIsLoading(true); // ← ローディング開始
    console.log(values);
    await sleep(3000); // ← ダミーAPI（ここにfetchなどを入れる）
    setIsLoading(false); // ← ローディング終了
    router.push(Links.auth.signin);
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
            mt={24}
            radius='md'
            {...form.getInputProps('password')}
          />
          <Radio.Group
            name='gender'
            label='性別'
            mt={24}
            withAsterisk
            key={form.key('gender')}
            {...form.getInputProps('gender')}
          >
            <Group mt='xs'>
              <Radio value='0' label='回答しない' />
              <Radio value='1' label='男性' />
              <Radio value='2' label='女性' />
            </Group>
          </Radio.Group>
          <Button fullWidth disabled={isLoading || !form.isValid()} mt='xl' radius='md' type='submit'>
            登録
          </Button>
          <Anchor
            component={Link}
            underline='always'
            size={'12px'}
            href={Links.auth.signin}
            mt={14}
            className='u-display--block u-align--right'
          >
            アカウントをお持ちの方はこちら
          </Anchor>
        </form>
      </Paper>

      {isLoading && <FullScreenLoader />}
    </>
  );
};
