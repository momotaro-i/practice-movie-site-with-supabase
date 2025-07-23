import { useSession } from '@/components/SessionProvider';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useFavorites = () => {
  const supabase = createClient();
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const session = useSession();
  const router = useRouter();

  // ログイン中のユーザーのお気に入り状況を取得
  useEffect(() => {
    if (!session) return;

    const fetchFavorites = async () => {
      const user = await supabase.auth.getUser();
      if (user.data.user) {
        const { data: favorites } = await supabase
          .from('favorites')
          .select('title_id')
          .eq('user_id', user.data.user.id);

        if (favorites) {
          const ids = favorites.map((favorite) => favorite.title_id);
          setFavoriteIds(new Set(ids));
        }
      }
    };

    fetchFavorites();
  }, [session, supabase]);

  const toggleFavorite = async (id: number) => {
    if (!session) {
      router.push('/signin');
      return;
    }

    try {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) return;

      const isFavorite = favoriteIds.has(id);

      if (isFavorite) {
        // 削除
        await supabase.from('favorites').delete().eq('user_id', user.id).eq('title_id', id);
      } else {
        // 追加
        await supabase.from('favorites').insert({
          user_id: user.id,
          title_id: id,
        });
      }

      // 状態を更新
      setFavoriteIds((prev) => {
        const newSet = new Set(prev);
        if (isFavorite) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    } catch (err) {
      console.error('お気に入り操作エラー:', err);
    }
  };

  return { favoriteIds, toggleFavorite };
};
