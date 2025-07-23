import styled from 'styled-components';

import { media } from '@/styles/styled-component/responsive';

export const GlobalHeader = () => {
  // const router = useRouter();
  // const { isLoggedIn, logout, rehydrated } = useAuthStore();

  // useEffect(() => {
  //   const hydrate = async () => {
  //     await useAuthStore.persist.rehydrate();
  //     useAuthStore.getState().setRehydrated();
  //   };
  //   hydrate();
  // }, []);

  // if (!rehydrated) return <FullScreenLoader opacity={1} />;
  return <SHeader>ヘッダー</SHeader>;
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
