'use client';

import { Flex } from '@mantine/core';

import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

import { ThemeSection } from '@/features/movie/components/ThemeSection';
import { useFavorites } from '@/features/movie/hooks/useFavorites';
import { useMovieData } from '@/features/movie/hooks/useMovieData';

export default function Home() {
  const { data, error, loading } = useMovieData();
  const { favoriteIds, toggleFavorite, updateMoviesData } = useFavorites({ data });

  if (loading) {
    return <FullScreenLoader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Flex direction='column' gap='40px'>
      {updateMoviesData &&
        updateMoviesData.map((theme, index) => (
          <ThemeSection
            favoriteIds={favoriteIds}
            index={index}
            key={theme.id}
            theme={theme}
            onToggleFavorite={toggleFavorite}
          />
        ))}
    </Flex>
  );
}
