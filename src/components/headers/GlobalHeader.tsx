import { Anchor, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Links } from '@/configs/links';
type Props = {
  isLoggedIn: boolean;
};
export const GlobalHeader = ({ isLoggedIn }: Props) => {
  const links = [
    { link: Links.home, label: 'ホーム' },
    { link: Links.mypage.favorite, label: 'お気に入り' },
  ];
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Anchor
      className='hover-opacity'
      href={link.link}
      key={link.label}
      styles={(theme) => ({
        root: {
          padding: '0.5rem',
          fontWeight: 500,
          color: theme.white,
        },
      })}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Group
      component='header'
      justify='space-between'
      left={0}
      pos='fixed'
      px={20}
      top={0}
      w='100%'
      styles={(theme) => ({
        root: {
          backgroundColor: theme.colors.primary[7],
          height: '60px',
          display: 'flex',
          zIndex: 2,
        },
      })}
    >
      <Group>
        <Burger color='#ffffff' hiddenFrom='sm' opened={opened} size='sm' onClick={toggle} />
        <Title
          order={1}
          styles={() => ({
            root: {
              fontWeight: 700,
            },
          })}
        >
          Movie
        </Title>
      </Group>

      <Group>
        <Group gap={10} ml={50}>
          {items}
          {isLoggedIn ? (
            <form action={Links.auth.signout} method='post' style={{ cursor: 'pointer' }}>
              <button className='hover-opacity' style={{ fontWeight: 500, color: 'white' }} type='submit'>
                サインアウト
              </button>
            </form>
          ) : (
            <Anchor
              className='hover-opacity'
              href={Links.auth.signin}
              styles={(theme) => ({
                root: {
                  padding: '0.5rem',
                  fontWeight: 500,
                  color: theme.white,
                },
              })}
            >
              サインイン
            </Anchor>
          )}
        </Group>
      </Group>
    </Group>
  );
};
