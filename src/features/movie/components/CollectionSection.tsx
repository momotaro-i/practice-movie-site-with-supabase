'use client';

import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Text, Title } from '@mantine/core';

import { TCollectionWithFavorites } from '@/types';

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
        emblaOptions={{ loop: true, align: 'start' }}
        slideGap={{ base: '10px', sm: '10px' }}
        slideSize={{ base: '300px', sm: '300px', md: '300px' }}
        withControls={false}
      >
        {collection.items?.map((item) => (
          <Carousel.Slide key={item.id}>
            <MovieCard isFavorite={favoriteIds.has(item.id)} item={item} onToggleFavorite={onToggleFavorite} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};
