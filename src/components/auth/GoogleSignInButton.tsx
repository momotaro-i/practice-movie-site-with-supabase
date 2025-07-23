'use client';

import { createClient } from '@/utils/supabase/client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// Google Sign-In types
interface CredentialResponse {
  credential: string;
  select_by: string;
}

declare global {
  var handleSignInWithGoogle: ((response: CredentialResponse) => void) | undefined;
}

const GoogleSignInButton = () => {
  const [nonce, setNonce] = useState<string>('');

  useEffect(() => {
    // nonceを生成
    const generateNonce = () => {
      const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
      setNonce(nonce);
      return nonce;
    };

    const currentNonce = generateNonce();

    // グローバル関数として定義
    window.handleSignInWithGoogle = async (response: CredentialResponse) => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
          nonce: currentNonce, // nonceを追加
        });

        if (error) throw error;

        // ログイン成功後の処理
        window.location.href = '/';
      } catch (error) {
        console.error('Error logging in with Google', error);
      }
    };

    return () => {
      // クリーンアップ
      window.handleSignInWithGoogle = undefined;
    };
  }, []);

  return (
    <>
      <Script src='https://accounts.google.com/gsi/client' async />
      <div
        id='g_id_onload'
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context='signin'
        data-ux_mode='popup'
        data-callback='handleSignInWithGoogle'
        data-auto_prompt='false'
        data-nonce={nonce}
      ></div>

      <div
        className='g_id_signin'
        data-type='standard'
        data-shape='rectangular'
        data-theme='outline'
        data-text='signin_with'
        data-size='large'
        data-logo_alignment='left'
      ></div>
    </>
  );
};

export default GoogleSignInButton;
