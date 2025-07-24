// app/layout.tsx
import { notoSansJP, roboto } from '@/configs/fonts';
import '@/styles/globals.scss';
import { createClient } from '@/utils/supabase/server'; // cookies使うSupabaseラッパー
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import ClientRoot from 'app/ClientRoot';
import { ReactNode } from 'react';

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
      <body className={`${roboto.variable} ${notoSansJP.variable}`} suppressHydrationWarning>
        <ClientRoot user={user}>
          <Notifications />
          {children}
        </ClientRoot>
      </body>
    </html>
  );
}
