import { TUser } from '@/features/users/types';
import { useFetchGet } from '@/hooks/useFetchGet';
import { Button, Flex, Loader, Space } from '@mantine/core';

export const UserList = () => {
  const { fetch, data, isLoading, abort, error, reset } = useFetchGet<TUser[]>();

  const handleGetUser = () => {
    reset();
    fetch('https://jsonplaceholder.typicode.com/users');
  };

  const handleAbort = () => {
    abort();
  };

  return (
    <div>
      <Flex gap={10}>
        <Button onClick={handleGetUser} disabled={isLoading}>
          ユーザーを取得
        </Button>

        <Button onClick={handleAbort} disabled={!isLoading}>
          中断（Abort）
        </Button>

        <Button onClick={reset} disabled={isLoading}>
          リセット
        </Button>
      </Flex>

      <Space h={10} />
      <ul>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.map((user) => (
              <li key={user.id}>
                {user.name} — {user.email}
              </li>
            ))}
          </>
        )}
      </ul>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};
