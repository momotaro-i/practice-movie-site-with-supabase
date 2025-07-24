import { Anchor, Autocomplete, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaSearch } from 'react-icons/fa';

type Props = {
  isLoggedIn: boolean;
};
export const GlobalHeader = ({ isLoggedIn }: Props) => {
  const links = [
    { link: '/', label: 'ホーム' },
    { link: isLoggedIn ? '/favorite' : '/signin', label: isLoggedIn ? 'お気に入り' : 'サインイン' },
  ];
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      className='hover-opacity'
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
      px={20}
      styles={(theme) => ({
        root: {
          backgroundColor: theme.colors.primary[7],
          height: '60px',
          display: 'flex',
        },
      })}
    >
      <Group>
        <Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' color='#ffffff' />
        <Title
          order={1}
          styles={(theme) => ({
            root: {
              fontWeight: 700,
            },
          })}
        >
          Movie
        </Title>
      </Group>

      <Group>
        <Group ml={50} gap={10}>
          {items}
        </Group>
        <Autocomplete
          placeholder='Search'
          leftSection={<FaSearch size={16} color='#5c636c' />}
          visibleFrom='xs'
          styles={(theme) => ({
            input: {
              borderColor: theme.colors.darkBg[8],
              backgroundColor: '#ffffff',
              color: theme.colors.darkBg[8],
              '&:focus': {
                borderColor: '#1e40af',
              },
              '&::placeholder': {
                color: theme.colors.darkBg[8],
              },
            },
            placeholder: {
              color: theme.colors.darkBg[8],
            },
          })}
        />
      </Group>
    </Group>
  );
};
