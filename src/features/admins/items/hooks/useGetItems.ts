import { useCallback, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { useAsync } from '@/hooks/useAsync';

import { TAdminItem } from '@/features/admins/items/types';

export const useGetItems = () => {
  const supabase = createClient();

  const [items, setItems] = useState<TAdminItem[]>([]);

  const fetchItems = useCallback(async (): Promise<TAdminItem[]> => {
    const { data, error } = await supabase
      .from('items')
      .select(
        `
        *,
        sub_theme:collections (
          id, title,
          theme:themes ( id, name )
        )
      `
      )
      .order('id', { ascending: true });
    if (error) throw error;

    return data as unknown as TAdminItem[];
  }, [supabase]);

  const { isLoading, run: handleFetchThemes } = useAsync(fetchItems);

  const handleGetItems = useCallback(async () => {
    const data = await handleFetchThemes();
    setItems(data ?? []);
  }, [handleFetchThemes]);

  return { items, isLoading, handleGetItems };
};
