import { Noto_Sans_JP, Roboto } from 'next/font/google';

// Roboto（英数字用）
export const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

// Noto Sans JP（日本語用）
export const notoSansJP = Noto_Sans_JP({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '700'], // 必要なウェイトを指定
});

// 一覧にまとめる
export const fonts = {
  roboto,
  notoSansJP,
} as const;

// フォントキー型
export type FontKey = keyof typeof fonts;

export type FontWeights = {
  notoSansJP: 400 | 500 | 700;
  roboto: 400 | 500 | 700;
};
