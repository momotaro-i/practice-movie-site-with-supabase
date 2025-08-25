'use client';

import { Flex, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaExchangeAlt, FaListUl, FaSignOutAlt, FaUserFriends } from 'react-icons/fa';
import styled from 'styled-components';

import { createClient } from '@/utils/supabase/client';

import { useAsync } from '@/hooks/useAsync';

import { UserContext } from '@/components/auth/UserProvider';
import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

import { Links } from '@/configs/links';
import { TUser } from '@/types';

const data = [
  { link: Links.admin.users, label: 'ユーザー管理', icon: FaUserFriends },
  { link: Links.admin.themes, label: 'テーマ管理', icon: FaListUl },
  { link: Links.admin.collections, label: 'サブテーマ管理', icon: FaListUl },
  { link: Links.admin.items, label: '作品管理', icon: FaListUl },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [active, setActive] = useState('作品管理');
  const [display, setDisplay] = useState(false);
  // adminユーザー以外だったらリダイレクト
  const user = useContext(UserContext);
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
  }, [supabase]);

  const { isLoading, run } = useAsync(fetchUsers);
  useEffect(() => {
    // ① ログインチェック
    if (!user) {
      router.push(Links.auth.signin);
      return;
    }
    (async () => {
      const data: TUser[] | undefined = await run();

      // ② 管理者チェック
      const currentUserInfo = data?.find((d) => d.id === user.id);
      if (currentUserInfo) {
        if (currentUserInfo.role !== 'admin') {
          router.push(Links.home);
          return;
        } else {
          setDisplay(true);
        }
      }
    })();
  }, [router, user, run]);

  if (!display) {
    return isLoading ? <FullScreenLoader /> : null;
  }
  return (
    <Flex>
      <SNavbar>
        <SNavbarMain>
          <SHeader>
            <Title c='black' order={1} size='md'>
              管理者画面
            </Title>
          </SHeader>
          {data.map((item) => (
            <SNavLink
              data-active={item.label === active || undefined}
              href={item.link}
              key={item.label}
              onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
              }}
            >
              <item.icon className='linkIcon' />
              <span>{item.label}</span>
            </SNavLink>
          ))}
        </SNavbarMain>

        <SFooter>
          <SNavLink href='#' onClick={(e) => e.preventDefault()}>
            <FaExchangeAlt className='linkIcon' />
            <span>Change account</span>
          </SNavLink>

          <SNavLink href='#' onClick={(e) => e.preventDefault()}>
            <FaSignOutAlt className='linkIcon' />
            <span>Logout</span>
          </SNavLink>
        </SFooter>
      </SNavbar>
      <SChildrenWrapper className='p-20'>{children}</SChildrenWrapper>
    </Flex>
  );
}

export default AdminLayout;

export const SNavbar = styled.nav`
  height: 100vh;
  width: 300px;
  padding: var(--mantine-spacing-md);
  display: flex;
  flex-direction: column;
  border-right: 1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
`;

export const SNavbarMain = styled.div`
  flex: 1;
`;

export const SHeader = styled.div`
  padding-bottom: var(--mantine-spacing-md);
  margin-bottom: calc(var(--mantine-spacing-md) * 1.5);
  border-bottom: 1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
`;

export const SFooter = styled.div`
  padding-top: var(--mantine-spacing-md);
  margin-top: var(--mantine-spacing-md);
  border-top: 1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
`;

export const SNavLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: var(--mantine-font-size-sm);
  color: light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1));
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-sm);
  border-radius: var(--mantine-radius-sm);
  font-weight: 500;

  .linkIcon {
    color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-2));
    margin-right: var(--mantine-spacing-sm);
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  &:hover {
    background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
    color: light-dark(var(--mantine-color-black), var(--mantine-color-white));

    .linkIcon {
      color: light-dark(var(--mantine-color-black), var(--mantine-color-white));
    }
  }

  &[data-active] {
    background-color: var(--mantine-color-blue-light);
    color: var(--mantine-color-blue-light-color);

    .linkIcon {
      color: var(--mantine-color-blue-light-color);
    }

    &:hover {
      background-color: var(--mantine-color-blue-light);
      color: var(--mantine-color-blue-light-color);
    }
  }
`;

const SChildrenWrapper = styled.div`
  p,
  h1,
  h2,
  h3,
  h4 {
    color: var(--black) !important;
  }
`;
