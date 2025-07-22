import { useRouter } from 'next/router';
import styled from 'styled-components';

import { FullScreenLoader } from '@/components/loader/FullScreenLoader';
import { Links } from '@/configs/links';
import { useAuthStore } from '@/features/auth/store';
import { media } from '@/styles/styled-component/responsive';
import { useEffect } from 'react';

export const GlobalHeader = () => {
  const router = useRouter();
  const { isLoggedIn, logout, rehydrated } = useAuthStore();

  useEffect(() => {
    const hydrate = async () => {
      await useAuthStore.persist.rehydrate();
      useAuthStore.getState().setRehydrated();
    };
    hydrate();
  }, []);

  if (!rehydrated) return <FullScreenLoader opacity={1} />;
  return (
    <SHeader>
      <button type='button' onClick={isLoggedIn ? logout : () => router.push(Links.auth.signin)}>
        {isLoggedIn ? 'ログアウト' : 'ログイン'}
      </button>
    </SHeader>
  );
};

const SHeader = styled.header`
  background-color: var(--light-blue);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media ${media.pc} {
    padding-left: 24px;
    padding-right: 24px;
    height: 60px;
  }
  @media ${media.sp} {
  }
`;
