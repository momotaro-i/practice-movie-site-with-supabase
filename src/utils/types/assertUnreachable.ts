/**
 * switch 文や if 文で網羅性を保証するための安全装置。
 * すべてのパターンを処理したはずの箇所で、万一漏れがあった場合にエラーを投げる。
 *
 * 使用方法:
 * 1. 列挙型や文字列リテラルなどのユニオン型に対して switch 文を使う。
 * 2. すべてのケースを網羅し、最後に default でこの関数を呼ぶ。
 * 3. 将来的に型が追加されても、switch に未対応なら TypeScript が型エラーを出してくれる。
 *
 * 例:
 *
 * type Color = 'red' | 'blue';
 *
 * function getColorCode(color: Color): string {
 *   switch (color) {
 *     case 'red':
 *       return '#FF0000';
 *     case 'blue':
 *       return '#0000FF';
 *     default:
 *       return assertUnreachable(color); // 型漏れチェック！
 *   }
 * }
 *
 * // Color に 'green' を追加したが switch に未対応 → コンパイルエラー
 */

export const assertUnreachable = (x: never): never => {
  throw new Error(`Unexpected value: ${x}`);
};
