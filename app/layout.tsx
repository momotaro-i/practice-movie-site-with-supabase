'use client';

// app/layout.tsx
import { notoSansJP, roboto } from '@/configs/fonts';
import '@/styles/globals.scss';
import { mantineBaseTheme } from '@/styles/mantine/mantineBaseTheme';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ReactNode } from 'react';
import { ServerStyleSheet } from 'styled-components';

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  const sheet = new ServerStyleSheet();
  const styledElements = sheet.getStyleElement();

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
        <MantineProvider theme={mantineBaseTheme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
