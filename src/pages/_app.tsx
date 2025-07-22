import '@/styles/globals.scss';
import { MantineProvider } from '@mantine/core';

import { mantineBaseTheme } from '@/styles/mantine/mantineBaseTheme';

import { GTM_ID, META_TITLE_BASE } from '@/configs';
import { notoSansJP, roboto } from '@/configs/fonts';
import { useGTM } from '@/hooks/useGTM';
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  useGTM();
  return (
    <>
      <Head>
        <title>{META_TITLE_BASE}</title>
        <meta content='FIXME' name='description' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <MantineProvider theme={mantineBaseTheme}>
        <div className={`${roboto.variable} ${notoSansJP.variable}`}>
          <Script
            id={GTM_ID}
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
            }}
          />
          <Component {...pageProps} />
        </div>
      </MantineProvider>
    </>
  );
}
