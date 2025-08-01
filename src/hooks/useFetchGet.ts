import { useCallback, useRef, useState } from 'react';

import { fetchJson } from '@/utils/fetch/fetchJson';

/**
 * 任意のURLに対してGETリクエストを行うためのカスタムフック
 * - 明示的にfetch()を呼んだときのみリクエストが発生
 * - AbortController による中断も可能
 */
export function useFetchGet<T>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  // データ取得を実行する関数
  const fetch = useCallback(async (url: string) => {
    controllerRef.current?.abort(); // 前のリクエストを中断
    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchJson<T>(url, { signal: controller.signal });
      setData(result);
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        setError(e as Error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // リセット
  const reset = () => {
    controllerRef.current?.abort();
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  // リクエストを手動で中断する
  const abort = () => controllerRef.current?.abort();

  return { data, isLoading, error, fetch, abort, reset };
}
