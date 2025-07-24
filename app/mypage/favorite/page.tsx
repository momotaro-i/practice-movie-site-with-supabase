'use client';

import { Links } from '@/configs/links';
import { MovieCard } from '@/features/movie/components/MovieCard';
import { useFavorites } from '@/features/movie/hooks/useFavorites';
import { TItem } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { Box, Flex, Text } from '@mantine/core';
import { UserContext } from 'app/ClientRoot';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const FavoritePage = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  const supabase = createClient();
  const [favoriteItems, setFavoriteItems] = useState<(TItem & { like_count?: number })[]>([]);
  const { favoriteIds: globalFavoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!user) {
      router.push(Links.auth.signin);
      return;
    }

    const fetchFavoriteItems = async () => {
      // items テーブルから該当のものだけ取得
      const favoriteIdsArray = Array.from(globalFavoriteIds);
      const { data: items, error: itemsError } = await supabase.from('items').select('*').in('id', favoriteIdsArray);

      if (itemsError) {
        console.error('Failed to fetch items:', itemsError);
        return;
      }
      setFavoriteItems(items);
    };
    fetchFavoriteItems();
  }, [user, router, globalFavoriteIds]);

  return (
    <Box>
      {favoriteItems.length > 0 ? (
        <Flex gap={20} wrap='wrap'>
          {favoriteItems.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              isFavorite={globalFavoriteIds.has(item.id)}
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
