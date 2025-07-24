'use client';

import { Box, Flex, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

import { Links } from '@/configs/links';
import { MovieCard } from '@/features/movie/components/MovieCard';
import { useFavorites } from '@/features/movie/hooks/useFavorites';
import { TItemWithFavoriteCount } from '@/types';
import { UserContext } from 'app/ClientRoot';

// TODO: お気に入りを消すたびに作品取得のAPIを叩くのは非効率
const FavoritePage = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  const supabase = createClient();
  const [favoriteItems, setFavoriteItems] = useState<TItemWithFavoriteCount[] | null>(null);
  const data = useMemo(() => [], []);
  const { favoriteIds: globalFavoriteIds, toggleFavorite } = useFavorites({ data });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push(Links.auth.signin);
      setIsLoading(false);
      return;
    }

    const fetchFavoriteItems = async () => {
      // items テーブルから該当のものだけ取得
      const favoriteIdsArray = Array.from(globalFavoriteIds);
      const { data: items, error: itemsError } = await supabase.from('items').select('*').in('id', favoriteIdsArray);

      if (itemsError) {
        console.error('Failed to fetch items:', itemsError);
        setIsLoading(false);
        return;
      }
      setFavoriteItems(items);
    };
    setIsLoading(false);
    fetchFavoriteItems();
  }, [user, router, globalFavoriteIds, supabase]);

  return (
    <Box>
      {isLoading ? (
        <FullScreenLoader />
      ) : favoriteItems && favoriteItems.length > 0 ? (
        <Flex gap={20} wrap='wrap'>
          {favoriteItems.map((item) => (
            <MovieCard
              isFavorite={globalFavoriteIds.has(item.id)}
              item={item}
              key={item.id}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </Flex>
      ) : (
        <Text>
          お気に入りがありません
          <br />
          お気に入りに追加したいものを検索してみましょう
        </Text>
      )}
    </Box>
  );
};

export default FavoritePage;
