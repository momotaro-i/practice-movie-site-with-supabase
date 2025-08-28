import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import '@/styles/globals.scss';
import '@mantine/dropzone/styles.css';
import 'mantine-datatable/styles.layer.css';

import { UserProvider } from '@/components/auth/UserProvider';

import { notoSansJP, roboto } from '@/configs/fonts';
import { mantineBaseTheme } from '@/styles/mantine/mantineBaseTheme';

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang='ja' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme='auto' />
      </head>
      <body suppressHydrationWarning className={`${roboto.variable} ${notoSansJP.variable}`}>
        <MantineProvider theme={mantineBaseTheme}>
          <UserProvider>{children}</UserProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
