import { TItemsDataWithFavoriteCount, TItemsFavoriteCount, TResponse } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export const useMovieData = () => {
  const supabase = createClient();
  const [data, setData] = useState<TItemsDataWithFavoriteCount[]>();
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
          supabase.from('favorite_counts').select('*'),
        ]);

        const { data: allItems, error: allItemsError } = itemsData as { data: TResponse[]; error: any };
        const { data: favoritesItems, error: favoritesError } = favoritesData as {
          data: TItemsFavoriteCount[];
          error: any;
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
                const match = favoritesItems.find((f) => f.title_id === item.id);
                return {
                  ...item,
                  like_count: match?.like_count ?? 0,
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
