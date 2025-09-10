import { useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { TItemsFavoriteCount, TMoviesInfoWithFavorites, TResponse } from '@/types';

export const useMovieData = () => {
  const supabase = createClient();
  const [data, setData] = useState<TMoviesInfoWithFavorites[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [itemsData, favoritesData] = await Promise.all([
          supabase.from('themes').select(`
            *,
            collections (
              *,
              items (*)
            )
          `),
          supabase.rpc('get_favorite_counts'),
        ]);

        const { data: allItems, error: allItemsError } = itemsData as { data: TResponse[]; error: Error | null };
        const { data: favoritesItems, error: favoritesError } = favoritesData as {
          data: TItemsFavoriteCount[];
          error: Error | null;
        };

        if (allItemsError || favoritesError) {
          throw new Error('データの取得に失敗しました');
        }

        if (favoritesItems && allItems) {
          const itemsWithLikes = allItems.map((theme) => ({
            ...theme,
            collections: theme.collections.map((collection) => ({
              ...collection,
              items: collection.items.map((item) => {
                // いいね数を検索
                const favoriteCount = favoritesItems?.find((f) => f.item_id === item.id);
                return {
                  ...item,
                  favorite_count: favoriteCount?.favorites_count || 0,
                };
              }),
            })),
          }));

          setData(itemsWithLikes);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
        console.error('データ取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  return { data, loading, error };
};
