import { Box, Button, Flex, Space } from '@mantine/core';

import { DefaultLayout } from '@/components/layout/DefaultLayout';

import { DefaultButton } from '@/components/buttons/DefaultButton';
import { DefaultLinkButton } from '@/components/buttons/DefaultLinkButton';
import { IconTrash } from '@/components/icons/IconTrash';
import { MessageModal } from '@/components/modals/MessageModal';
import { Links } from '@/configs/links';
import { useAuthStore } from '@/features/auth/store';
import { Counter } from '@/features/counter/components/Counter';
import { UserList } from '@/features/users/components/UserList';
import { useDisclosure } from '@mantine/hooks';

export default function Home() {
  const isLoggedIn = useAuthStore.use.isLoggedIn();
  const welcomeText = process.env.NEXT_PUBLIC_WELCOME_TEXT;
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <DefaultLayout>
        <Box
          component='main'
          style={{
            flexGrow: 1,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {isLoggedIn ? (
            <>
              <p>{welcomeText}</p>
              <Space h={24} />
              <Counter />
              <Space h={24} />
              <p>ログイン中</p>
            </>
          ) : (
            <Button component='a' href={Links.auth.signin}>
              サインインページへ
            </Button>
          )}
          <Space h={24} />
          <UserList />
          <Space h={24} />
          <Flex direction={'column'} w={'100%'} align={'flex-start'} gap={10}>
            <DefaultButton color='primary' variant='filled' onClick={open}>
              プライマリーボタン （モーダル開く）
            </DefaultButton>
            <DefaultButton color='primary' variant='outline'>
              プライマリーボタン(アウトライン)
            </DefaultButton>
            <DefaultButton color='secondary' variant='filled' fullWidth>
              セカンダリーボタン fullWidth
            </DefaultButton>
            <DefaultButton color='danger' variant='filled' leftSection={<IconTrash />}>
              アイコン付き
            </DefaultButton>
            <DefaultButton color='primary' variant='subtle'>
              透明なぼたん
            </DefaultButton>
            <DefaultLinkButton href={Links.about} component='Link' color='default' variant='filled' fullWidth>
              Next Link
            </DefaultLinkButton>
            <DefaultLinkButton href={Links.about} component='a' color='default' variant='filled' fullWidth>
              a リンク
            </DefaultLinkButton>
            <DefaultLinkButton component='a' target='_blank' href={'/'} color='default' variant='outline' fullWidth>
              外部リンク
            </DefaultLinkButton>
          </Flex>
          <MessageModal opened={opened} handleClose={close} message='モーダルが開きました' />
        </Box>
      </DefaultLayout>
    </>
  );
}
