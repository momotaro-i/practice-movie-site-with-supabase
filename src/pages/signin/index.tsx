import MetaHead from '@/components/MetaHead';
import { META_TITLE_SUFFIX } from '@/configs';
import { Links } from '@/configs/links';
import { SigninView } from '@/features/auth/views/SigninView';

const SigninPage = () => {
  return (
    <>
      <MetaHead title={`ログイン${META_TITLE_SUFFIX}`} description='ログインページです' url={Links.auth.signin} />
      <SigninView />
    </>
  );
};

export default SigninPage;
