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
      py={10}
      styles={(theme) => ({
        root: {
          backgroundColor: theme.colors.primary[0],
          borderBottom: '1px solid #64748b',
        },
      })}
    >
      <Group>
        <Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' color='#ffffff' />
        <Title
          order={1}
          styles={(theme) => ({
            root: {
              color: theme.white,
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
          leftSection={<FaSearch size={16} color='#475569' />}
          visibleFrom='xs'
          styles={(theme) => ({
            input: {
              borderColor: theme.colors.primary[0],
              backgroundColor: '#ffffff',
              color: theme.colors.primary[0],
              '&:focus': {
                borderColor: '#1e40af',
              },
              '&::placeholder': {
                color: theme.colors.primary[0],
              },
            },
            placeholder: {
              color: theme.colors.primary[0],
            },
          })}
        />
      </Group>
    </Group>
  );
};
