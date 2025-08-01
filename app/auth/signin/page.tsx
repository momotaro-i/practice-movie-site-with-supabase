'use client';

import MetaHead from '@/components/MetaHead';

import { META_TITLE_SUFFIX } from '@/configs';
import { Links } from '@/configs/links';
import { SigninView } from '@/features/auth/views/SigninView';

const SigninPage = () => {
  return (
    <>
      <MetaHead description='ログインページです' title={`ログイン${META_TITLE_SUFFIX}`} url={Links.auth.signin} />
      <SigninView />
    </>
  );
};

export default SigninPage;
