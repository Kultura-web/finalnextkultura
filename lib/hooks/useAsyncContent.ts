import { use, useState, useEffect } from 'react';

interface UseAsyncContentOptions<T> {
  defaultValue: T;
  fetchFn: () => Promise<T | null>;
  timeout?: number;
}

interface UseAsyncContentResult<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
  isFromDatabase: boolean;
}

export function useAsyncContent<T>({
  defaultValue,
  fetchFn,
  timeout = 5000,
}: UseAsyncContentOptions<T>): UseAsyncContentResult<T> {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isFromDatabase, setIsFromDatabase] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const fetchData = async () => {
      setIsLoading(true);
      const startTime = Date.now();

      try {
        timeoutId = setTimeout(() => {
          if (isMounted && isLoading) {
            setError(new Error('Fetch timeout'));
            setIsLoading(false);
          }
        }, timeout);

        const result = await fetchFn();

        if (isMounted) {
          clearTimeout(timeoutId);

          if (result) {
            setData(result);
            setIsFromDatabase(true);
            setError(null);
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          clearTimeout(timeoutId);
          const error = err instanceof Error ? err : new Error(String(err));
          setError(error);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fetchFn, timeout]);

  return {
    data,
    isLoading,
    error,
    isFromDatabase,
  };
}
