'use client';

import { Box, Title } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { useAsync } from '@/hooks/useAsync';

import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

import { InviteForm } from '@/features/admins/users/components/InviteForm';
import { UserList } from '@/features/admins/users/components/UserList';
import { TUser } from '@/types';

export const AdminUsersView = () => {
  const supabase = createClient();
  const [filteredData, setFilteredData] = useState<TUser[] | null>(null);
  const fetchUsers = useCallback(async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
  }, [supabase]);

  const { isLoading, run } = useAsync(fetchUsers);

  useEffect(() => {
    (async () => {
      const data: TUser[] | undefined = await run();
      setFilteredData(data?.filter((user) => user.is_mail_confirmed && user.role === 'admin') ?? null);
    })();

    return () => {};
  }, [run]);

  const updateData = useCallback(async () => {
    const users: TUser[] | undefined = await run();
    setFilteredData(users?.filter((user) => user.is_mail_confirmed && user.role === 'admin') ?? null);
  }, [run]);

  return (
    <Box p={20}>
      <Title order={2}>管理者ユーザー一覧</Title>
      <InviteForm updateData={updateData} />
      {isLoading ? <FullScreenLoader /> : <UserList updateData={updateData} users={filteredData} />}
    </Box>
  );
};
