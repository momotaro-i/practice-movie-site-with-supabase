'use client';
import { useSession } from '@/components/SessionProvider';
import { TItemsDataWithFavoriteCount, TItemsFavoriteCount, TResponse } from '@/types';
import { createClient } from '@/utils/supabase/client';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

export default function Home() {
  const supabase = createClient();
  const [data, setData] = useState<TItemsDataWithFavoriteCount[]>();
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const session = useSession();
  const router = useRouter();

  // ログイン中のユーザーのいいね状況を取得
  useEffect(() => {
    if (!session) return;

    (async () => {
      const user = await supabase.auth.getUser(); // ログイン中のユーザーを取得
      if (!user.data.user) return;
      const { data: favorites } = await supabase.from('favorites').select('title_id').eq('user_id', user.data.user.id);
      if (!favorites) return;

      const ids = favorites.map((favorite) => favorite.title_id);
      setFavoriteIds((prev) => {
        return new Set([...prev, ...ids]);
      });
    })();

    return () => {};
  }, []);

  // 作品リストを取得
  useEffect(() => {
    const fetchData = async () => {
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
        allItemsError && console.error('データ取得エラー', allItemsError);
        favoritesError && console.error('データ取得エラー', favoritesError);
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
    };

    fetchData();
  }, []);

  const toggleFavorite = async (id: number) => {
    if (!session) {
      router.push('/login');
      return;
    }

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
  };

  return (
    <>
      {data &&
        data.map((theme, index) => (
          <div
            key={theme.id}
            className={clsx({
              'mt-20': index !== 0,
            })}
          >
            <h2 className='text-4xl font-bold '>{theme.name}</h2>
            {theme.collections
              ?.filter((col) => col.theme_id === theme.id)
              .map((collection) => (
                <div key={collection.id} className='mt-5'>
                  <div className='border-lime-500 border-l-solid border-l-2 pl-5'>
                    <h3 className='text-2xl font-bold'>{collection.title}</h3>
                    <p className='text-md'>{collection.description}</p>
                  </div>
                  <div className='flex flex-wrap gap-4'>
                    {collection.items
                      ?.filter((ttl) => ttl.collection_id === collection.id)
                      .map((title) => (
                        <div key={title.id} className='mt-4'>
                          <div className='relative cursor-pointer' onClick={() => toggleFavorite(title.id)}>
                            <Image src={title.image_url} alt={title.title} width={200} height={133} />
                            <div className='absolute bottom-2 right-2 z-10'>
                              <div className='flex gap-2'>
                                {favoriteIds.has(title.id) ? (
                                  <FaStar color='white' size={20} />
                                ) : (
                                  <FaRegStar color='white' size={20} />
                                )}
                                <p className='text-white'>{title.like_count}</p>
                              </div>
                            </div>
                          </div>
                          <p className='font-bold mt-2'>{title.title}</p>
                          <p>{title.description}</p>
                          <p>{title.copyright}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </>
  );
}
