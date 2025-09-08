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

  const getItems = useCallback(() => {
    return supabase
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
  }, [supabase]);

  const getThemes = useCallback(() => {
    return supabase.from('themes').select('*');
  }, [supabase]);

  const getSubThemes = useCallback(() => {
    return supabase.from('collections').select('*');
  }, [supabase]);
  const getCategories = useCallback(() => {
    return supabase.from('categories').select('*');
  }, [supabase]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // テーマ/サブテーマをまとめて取得
    (async () => {
      const [items, themesRes, subThemesRes, categoriesRes] = await Promise.all([
        getItems(),
        getThemes(),
        getSubThemes(),
        getCategories(),
      ]);
      setItems(items.data ?? ([] as unknown as TAdminItem[]));
      setThemes(themesRes.data ?? ([] as unknown as TTheme[]));
      setSubThemes(subThemesRes.data ?? ([] as unknown as TCollection[]));
      setCategories(categoriesRes.data ?? ([] as unknown as TCategory[]));
    })();
    setIsLoading(false);
  }, [getItems, getThemes, getSubThemes, getCategories]);

  return { items, isLoading, themes, subThemes, categories };
};
