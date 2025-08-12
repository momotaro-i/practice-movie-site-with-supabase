'use client';

import { Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

import { Links } from '@/configs/links';

// TODO: 本番はnonceを使用する
const GoogleSignInButton = () => {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    // Googleのコードが見つけられるように、グローバルスコープで利用可能である必要がある
    window.handleSignInWithGoogle = async (response: CredentialResponse) => {
      setIsSigningIn(true);
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });
      if (error) {
        console.error(error);
      } else {
        console.log('Logged in user:', data);
        router.push(Links.home); // ← ログイン後に遷移
      }
      setIsSigningIn(false);
    };
  }, [supabase.auth, router]);

  return (
    <>
      <Script async src='https://accounts.google.com/gsi/client' onLoad={() => setIsLoading(false)} />
      <div
        data-auto_prompt='false'
        data-callback='handleSignInWithGoogle'
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context='signin'
        data-use_fedcm_for_prompt='true'
        data-ux_mode='popup'
        id='g_id_onload'
      ></div>

      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px' }}>
          <Loader size='sm' />
        </div>
      )}
      <div
        className='g_id_signin'
        data-logo_alignment='left'
        data-shape='rectangular'
        data-size='large'
        data-text='signin_with'
        data-theme='outline'
        data-type='standard'
        data-width='400'
      ></div>
      {/* サインイン処理中ローダー（別 state） */}
      {isSigningIn && <FullScreenLoader />}
    </>
  );
};

export default GoogleSignInButton;
