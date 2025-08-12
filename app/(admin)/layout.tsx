'use client';

import { Flex, Title } from '@mantine/core';
import { useState } from 'react';
import { FaExchangeAlt, FaSignOutAlt, FaUserFriends } from 'react-icons/fa';
import styled from 'styled-components';

import { Links } from '@/configs/links';

const data = [{ link: Links.admin.users, label: 'ユーザー管理', icon: FaUserFriends }];

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
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
  ));

  return (
    <Flex>
      <SNavbar>
        <SNavbarMain>
          <SHeader>
            <Title c='black' order={1} size='md'>
              管理者画面
            </Title>
          </SHeader>
          {links}
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
