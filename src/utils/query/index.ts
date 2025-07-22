/**
 * クエリパラメータなどの string または string[] 型の値から先頭の文字列を取得する。
 *
 * Next.js の router.query のように、同じキーに複数値がある場合は配列になるため、
 * 配列の最初の要素を取り出し、常に string 型として扱えるようにする。
 *
 * @param value - 単一または複数の文字列（string | string[]）
 * @returns 最初の文字列（常に string 型）
 */
export const getFirstElement = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};
