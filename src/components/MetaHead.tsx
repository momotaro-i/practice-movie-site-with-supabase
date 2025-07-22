// components/MetaHead.tsx
import Head from 'next/head';

type MetaHeadProps = {
  title: string;
  description: string;
  url?: string;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'; // 本番URLは.envで管理

export default function MetaHead({ title, description, url = '' }: MetaHeadProps) {
  const fullUrl = `${baseUrl}${url}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
    </Head>
  );
}
