'use client';

import { Flex, TextInput } from '@mantine/core';
import { isEmail, useField } from '@mantine/form';
import { useCallback } from 'react';

import { createClient } from '@/utils/supabase/client';

import { useAsync } from '@/hooks/useAsync';

import { DefaultButton } from '@/components/buttons/DefaultButton';
import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

type Props = {
  updateData: () => void;
};
export const InviteForm = ({ updateData }: Props) => {
  const supabase = createClient();
  const emailField = useField({
    initialValue: '',
    validate: isEmail('メールアドレスが不正です'),
  });
  const updateUsers = useCallback(
    async (email: string) => {
      const { data, error } = await supabase.from('users').update({ role: 'admin' }).eq('email', email).select();
      if (error) throw error;
      return data;
    },
    [supabase]
  );

  const { isLoading, run } = useAsync(updateUsers);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ロールをadminに更新する
    const email = emailField.getValue();
    const data = await run(email);
    if (data) {
      updateData();
      emailField.reset();
    } else {
      emailField.setError('メールアドレスが見つかりません');
    }
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <form onSubmit={handleSubmit}>
        <Flex className='u-mt--20' gap={10}>
          <TextInput w={300} {...emailField.getInputProps()}></TextInput>
          <DefaultButton color='primary' type='submit'>
            管理者に追加する
          </DefaultButton>
        </Flex>
      </form>
    </>
  );
};
