import { useCallback, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { useAsync } from '@/hooks/useAsync';

import { TTheme } from '@/types';

export const useGetThemes = () => {
  const supabase = createClient();

  const [themes, setThemes] = useState<TTheme[]>([]);

  const fetchThemes = useCallback(async () => {
    const { data, error } = await supabase.from('themes').select('id, name').order('id', { ascending: true });
    if (error) throw error;
    return data;
  }, [supabase]);

  const { isLoading, run: handleFetchThemes } = useAsync(fetchThemes);

  const handleGetTheme = useCallback(async () => {
    const data = await handleFetchThemes();
    setThemes(data ?? []);
  }, [handleFetchThemes]);

  return { themes, isLoading, handleGetTheme };
};
