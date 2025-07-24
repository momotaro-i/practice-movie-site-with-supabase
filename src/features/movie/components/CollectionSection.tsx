'use client';

import { TCollectionWithFavorites } from '@/types';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Text, Title } from '@mantine/core';
import { MovieCard } from './MovieCard';

interface CollectionSectionProps {
  collection: TCollectionWithFavorites;
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
}

export const CollectionSection = ({ collection, favoriteIds, onToggleFavorite }: CollectionSectionProps) => {
  return (
    <div className='u-mt--20'>
      <Title order={3}>{collection.title}</Title>
      <Text>{collection.description}</Text>
      <Carousel
        className='u-mt--10'
        withControls={false}
        slideSize={{ base: '300px', sm: '300px', md: '300px' }}
        slideGap={{ base: '10px', sm: '10px' }}
        emblaOptions={{ loop: true, align: 'start' }}
      >
        {collection.items?.map((item) => (
          <Carousel.Slide key={item.id}>
            <MovieCard item={item} isFavorite={favoriteIds.has(item.id)} onToggleFavorite={onToggleFavorite} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};
