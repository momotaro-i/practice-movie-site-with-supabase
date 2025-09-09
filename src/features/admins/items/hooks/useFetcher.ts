import { useCallback, useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { TAdminItem } from '@/features/admins/items/types';
import { TCategory, TCollection, TTheme } from '@/types';

export const useFetcher = () => {
  const supabase = createClient();
  const [themes, setThemes] = useState<TTheme[]>([]);
  const [subThemes, setSubThemes] = useState<TCollection[]>([]);
  const [items, setItems] = useState<TAdminItem[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);

  const getItems = useCallback(async () => {
    const result = await supabase
      .from('items')
      .select(
        `
      *,
      categories:categories!items_categories ( id, name ),
      sub_theme:collections (
        id, title,
        theme:themes ( id, name )
      )
    `
      )
      .order('id', { ascending: true });

    setItems(result.data ?? ([] as unknown as TAdminItem[]));
    return result;
  }, [supabase]);

  const getThemes = useCallback(async () => {
    const result = await supabase.from('themes').select('*');
    setThemes(result.data ?? ([] as unknown as TTheme[]));
    return result;
  }, [supabase]);

  const getSubThemes = useCallback(async () => {
    const result = await supabase.from('collections').select('*');
    setSubThemes(result.data ?? ([] as unknown as TCollection[]));
    return result;
  }, [supabase]);

  const getCategories = useCallback(async () => {
    const result = await supabase.from('categories').select('*');
    setCategories(result.data ?? ([] as unknown as TCategory[]));
    return result;
  }, [supabase]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // テーマ/サブテーマをまとめて取得
    (async () => {
      await Promise.all([getThemes(), getSubThemes(), getCategories(), getItems()]);
    })();
    setIsLoading(false);
  }, [getItems, getThemes, getSubThemes, getCategories]);

  return { items, isLoading, themes, subThemes, categories, getItems };
};
