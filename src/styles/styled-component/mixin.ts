import { css } from 'styled-components';

import { FontKey, fonts, FontWeights } from '@/configs/fonts';

export const mixins = {
  /* 指定した行数でテキストを省略表示（...）します。 */
  lineClamp: (lines: number) => css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: ${lines};
  `,
  // 指定したフォントファミリとフォントウェイトを適用します。
  fontFamilyWeight: <T extends FontKey>(family: T, weight: FontWeights[T]) => {
    const font = fonts[family];
    return css`
      font-family: var(${font.variable});
      font-weight: ${weight};
    `;
  },
  // 16進カラーコード（例: #ffcc00）を r, g, b 形式の文字列に変換します。
  // 透明度を扱いたい場合などに rgba() と組み合わせて使います
  hexToRGB: (hex: `#${string}` = '#d5d7d8') => {
    // 16進数カラーコードを正規化して、`#`を除去
    const normalizedHex = hex.replace(/^#/, '');

    // 3桁の場合（例: #fff → #ffffff）に拡張
    const hexValue =
      normalizedHex.length === 3
        ? normalizedHex
            .split('')
            .map((c) => c + c)
            .join('')
        : normalizedHex;

    // 16進数カラーコードが正しいかどうかを確認
    if (hexValue.length !== 6) {
      throw new Error('Invalid hex color');
    }

    // 各色を抽出
    const r = parseInt(hexValue.slice(0, 2), 16);
    const g = parseInt(hexValue.slice(2, 4), 16);
    const b = parseInt(hexValue.slice(4, 6), 16);

    // RGB形式で返す
    return `${r}, ${g}, ${b}`;
  },
  // NEXT_PUBLIC_ASSET_PREFIX を自動的に付与して背景画像を設定します。
  bg: (url: string) => {
    return css`
      background-image: url(${process.env.NEXT_PUBLIC_ASSET_PREFIX}${url});
    `;
  },
};
