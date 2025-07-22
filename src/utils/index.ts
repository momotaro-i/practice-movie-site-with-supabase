/**
 * 指定したミリ秒だけ非同期で待機するユーティリティ関数。
 */

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
