// src/hooks/useFetchPost.ts

import { fetchJson } from '@/utils/fetch/fetchJson';
import { useCallback, useRef, useState } from 'react';

/**
 * fetch() の body に渡せる形式
 * - JSONオブジェクト or FormData など
 */
type FetchableBody = BodyInit | Record<string, any> | null | undefined;

/**
 * POSTリクエスト専用のカスタムフック
 * - 明示的に post() を呼んだ時だけリクエストが実行される
 * - JSON も FormData も対応
 * - AbortController によるキャンセルも可能
 */
export function useFetchPost<TResponse = unknown, TBody extends FetchableBody = Record<string, any>>() {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  // 明示的にPOSTリクエストを送信する関数
  const post = useCallback(async (url: string, body: TBody) => {
    controllerRef.current?.abort(); // 既存のリクエストを中断
    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const isJson = typeof body === 'object' && !(body instanceof FormData);

      const result = await fetchJson<TResponse>(url, {
        method: 'POST',
        body: isJson ? JSON.stringify(body) : (body as BodyInit),
        headers: isJson ? { 'Content-Type': 'application/json' } : {},
        signal: controller.signal,
      });

      setData(result);
      return result;
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        setError(e as Error);
      }
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // リクエストを手動でキャンセルする
  const abort = () => controllerRef.current?.abort();

  return { post, data, isLoading, error, abort };
}
