import { Box, Flex, Text } from '@mantine/core';
import { useCallback, useContext } from 'react';

import { createClient } from '@/utils/supabase/client';

import { useAsync } from '@/hooks/useAsync';

import { UserContext } from '@/components/auth/UserProvider';
import { DefaultButton } from '@/components/buttons/DefaultButton';
import { IconTrash } from '@/components/icons/IconTrash';
import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

import { TUser } from '@/types';

type Props = {
  updateData: () => void;
  users: TUser[] | null;
};
export const UserList = ({ updateData, users }: Props) => {
  const loginUser = useContext(UserContext);
  const supabase = createClient();

  const updateUsers = useCallback(
    async (id: string) => {
      const { data, error } = await supabase.from('users').update({ role: 'viewer' }).eq('id', id).select();
      if (error) throw error;
      return data;
    },
    [supabase]
  );

  const { isLoading, run } = useAsync(updateUsers);
  const handleDelete = async (id: string) => {
    const data = await run(id);
    if (data) {
      updateData();
    }
  };
  return (
    <div>
      <Box className='u-mt--20'>
        {users ? (
          users.map((user, index) => (
            <Flex align='center' gap={10} key={index}>
              <Text key={index}>{user.email}</Text>
              {loginUser?.id !== user.id && (
                <DefaultButton color='primary' variant='subtle' onClick={() => handleDelete(user.id)}>
                  <IconTrash />
                </DefaultButton>
              )}
            </Flex>
          ))
        ) : (
          <div>ユーザーが存在しません</div>
        )}
      </Box>
      {isLoading && <FullScreenLoader />}
    </div>
  );
};
