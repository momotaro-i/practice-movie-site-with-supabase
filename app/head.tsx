import { META_TITLE_BASE } from '@/configs';

// app/head.tsx
export default function Head() {
  return (
    <>
      <title>{META_TITLE_BASE}</title>
      <meta name='description' content='FIXME' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </>
  );
}
