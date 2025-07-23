'use client';

import { GlobalHeader } from '@/components/headers/GlobalHeader';
// app/layout.tsx
import { SessionProvider } from '@/components/SessionProvider';
import { notoSansJP, roboto } from '@/configs/fonts';
import '@/styles/globals.scss';
import { mantineBaseTheme } from '@/styles/mantine/mantineBaseTheme';
import { createClient } from '@/utils/supabase/client';
import { Box, ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Session } from '@supabase/supabase-js';
import { ReactNode, useEffect, useState } from 'react';
import { ServerStyleSheet } from 'styled-components';

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  const sheet = new ServerStyleSheet();
  const styledElements = sheet.getStyleElement();
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // 初期セッションを取得
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    // セッション変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <html lang='ja' {...mantineHtmlProps}>
      <head>
        {/* styled-componentsのSSRスタイル */}
        {styledElements}
        {/* Mantine用カラースキーム設定 */}
        <ColorSchemeScript defaultColorScheme='auto' />
      </head>
      <body className={`${roboto.variable} ${notoSansJP.variable}`}>
        {/* Mantineテーマ適用 */}
        <MantineProvider theme={mantineBaseTheme}>
          <SessionProvider session={session}>
            <GlobalHeader isLoggedIn={!!session} />
            <Box component='main' p={20}>
              {children}
            </Box>
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
