import { useCallback, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { useAsync } from '@/hooks/useAsync';

import { TSubTheme } from '@/features/admins/subThemes/types';

export const useGetSubThemes = () => {
  const supabase = createClient();

  const [subThemes, setSubThemes] = useState<TSubTheme[]>([]);

  const fetchSubThemes = useCallback(async (): Promise<TSubTheme[]> => {
    const { data, error } = await supabase
      .from('collections')
      .select(
        `
          id, title, description, is_active,
          theme:themes ( id, name )
        `
      )
      .order('id', { ascending: true });
    if (error) throw error;

    return data as unknown as TSubTheme[];
  }, [supabase]);

  const { isLoading, run: handleFetchThemes } = useAsync(fetchSubThemes);

  const handleGetSubThemes = useCallback(async () => {
    const data = await handleFetchThemes();
    setSubThemes(data ?? []);
  }, [handleFetchThemes]);

  return { subThemes, isLoading, handleGetSubThemes };
};
