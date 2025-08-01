// app/layout.tsx
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { ReactNode } from 'react';

import { createClient } from '@/utils/supabase/server'; // cookies使うSupabaseラッパー

import '@/styles/globals.scss';

import { notoSansJP, roboto } from '@/configs/fonts';
import ClientRoot from 'app/ClientRoot';

type Props = { children: ReactNode };

export default async function RootLayout({ children }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang='ja' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme='auto' />
      </head>
      <body suppressHydrationWarning className={`${roboto.variable} ${notoSansJP.variable}`}>
        <ClientRoot user={user}>
          <Notifications />
          {children}
        </ClientRoot>
      </body>
    </html>
  );
}
