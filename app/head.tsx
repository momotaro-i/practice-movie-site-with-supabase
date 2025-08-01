import { META_TITLE_BASE } from '@/configs';

// app/head.tsx
export default function Head() {
  return (
    <>
      <title>{META_TITLE_BASE}</title>
      <meta content='FIXME' name='description' />
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <link href='/favicon.ico' rel='icon' />
    </>
  );
}
