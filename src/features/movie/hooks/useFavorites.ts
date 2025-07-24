import { Links } from '@/configs/links';
import { createClient } from '@/utils/supabase/client';
import { UserContext } from 'app/ClientRoot';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export const useFavorites = () => {
  const supabase = createClient();
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const user = useContext(UserContext);
  const router = useRouter();

  // ログイン中のユーザーのお気に入り状況を取得
  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      if (user) {
        // user_idが一致するtitle_idを取得
        const { data: favorites } = await supabase.from('favorites').select('title_id').eq('user_id', user.id);

        if (favorites) {
          // お気に入りのtitle_idを配列に変換
          const ids = favorites.map((favorite) => favorite.title_id);
          setFavoriteIds(new Set(ids));
        }
      }
    };

    fetchFavorites();
  }, [user, supabase]);

  const toggleFavorite = async (id: number) => {
    // ログインしていなかったらサインインページへリダイレクト
    if (!user) {
      router.push(Links.auth.signin);
      return;
    }

    try {
      const isFavorite = favoriteIds.has(id);

      if (isFavorite) {
        // user_idとtitle_idが一致するレコードを削除
        await supabase.from('favorites').delete().eq('user_id', user.id).eq('title_id', id);
      } else {
        // お気に入りに追加
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
