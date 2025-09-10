import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { UserContext } from '@/components/auth/UserProvider';

import { Links } from '@/configs/links';
import { TMoviesInfoWithFavorites } from '@/types';

type Props = {
  data?: TMoviesInfoWithFavorites[];
};
export const useFavorites = ({ data }: Props) => {
  const supabase = createClient();
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const user = useContext(UserContext);
  const router = useRouter();
  const [updateMoviesData, setUpdateMoviesData] = useState<TMoviesInfoWithFavorites[]>([]);

  useEffect(() => {
    if (!data) return;

    if (user) {
      // ログイン中のユーザーのお気に入り状況を取得
      const fetchFavorites = async () => {
        // user_idが一致するtitle_idを取得
        const { data: favorites } = await supabase.from('favorites').select('title_id').eq('user_id', user.id);

        if (favorites) {
          // お気に入りのtitle_idを配列に変換
          const ids = favorites.map((favorite) => favorite.title_id);
          setFavoriteIds(new Set(ids));
        }
      };

      fetchFavorites();
    }

    setUpdateMoviesData(data ?? []);
  }, [user, supabase, data]);

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
        // その作品のfavorite_countを1減らす
        setUpdateMoviesData((prev) =>
          prev.map((theme) => ({
            ...theme,
            collections: theme.collections.map((collection) => ({
              ...collection,
              items: collection.items.map((item) =>
                item.id === id ? { ...item, favorite_count: item.favorite_count - 1 } : item
              ),
            })),
          }))
        );
      } else {
        // お気に入りに追加
        await supabase.from('favorites').insert({
          user_id: user.id,
          title_id: id,
        });
        // その作品のfavorite_countを1増やす
        setUpdateMoviesData((prev) =>
          prev.map((theme) => ({
            ...theme,
            collections: theme.collections.map((collection) => ({
              ...collection,
              items: collection.items.map((item) =>
                item.id === id ? { ...item, favorite_count: item.favorite_count + 1 } : item
              ),
            })),
          }))
        );
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

  return { favoriteIds, toggleFavorite, updateMoviesData };
};
