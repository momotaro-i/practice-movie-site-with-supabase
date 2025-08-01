// components/MetaHead.tsx
import Head from 'next/head';

type MetaHeadProps = {
  description: string;
  title: string;
  url?: string;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'; // 本番URLは.envで管理

export default function MetaHead({ description, title, url = '' }: MetaHeadProps) {
  const fullUrl = `${baseUrl}${url}`;
  return (
    <Head>
      <title>{title}</title>
      <meta content={description} name='description' />
      <meta content={fullUrl} property='og:url' />
      <meta content={title} property='og:title' />
      <meta content={description} property='og:description' />
    </Head>
  );
}
