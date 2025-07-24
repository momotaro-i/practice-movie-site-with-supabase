'use client';

import { ThemeSection } from '@/components/movie/ThemeSection';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { FullScreenLoader } from '@/components/ui/FullScreenLoader';
import { useFavorites } from '@/hooks/useFavorites';
import { useMovieData } from '@/hooks/useMovieData';
import { Flex } from '@mantine/core';

export default function Home() {
  const { data, loading, error } = useMovieData();
  const { favoriteIds, toggleFavorite } = useFavorites();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Flex direction='column' gap='40px'>
      {data &&
        data.map((theme, index) => (
          <ThemeSection
            key={theme.id}
            theme={theme}
            index={index}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        ))}
    </Flex>
  );
}
