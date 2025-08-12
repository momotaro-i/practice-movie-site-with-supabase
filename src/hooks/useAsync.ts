import { useCallback, useState } from 'react';

type AsyncFunction<TArgs extends any[], TResult> = (...args: TArgs) => Promise<TResult>;

export function useAsync<TArgs extends any[], TResult>(asyncFunction: AsyncFunction<TArgs, TResult>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TResult | null>(null);

  const run = useCallback(
    async (...args: TArgs): Promise<TResult | undefined> => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction]
  );

  return { run, isLoading, error, data };
}
