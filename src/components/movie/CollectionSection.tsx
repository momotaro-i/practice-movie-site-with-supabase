'use client';

import { TCollection, TItem } from '@/types';
import { MovieCard } from './MovieCard';

interface CollectionSectionProps {
  collection: TCollection & {
    items: (TItem & { like_count: number })[];
  };
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
}

export const CollectionSection = ({ collection, favoriteIds, onToggleFavorite }: CollectionSectionProps) => {
  return (
    <div className='mt-5'>
      <div className='border-lime-500 border-l-solid border-l-2 pl-5'>
        <h3 className='text-2xl font-bold'>{collection.title}</h3>
        <p className='text-md'>{collection.description}</p>
      </div>
      <div className='flex flex-wrap gap-4'>
        {collection.items?.map((item) => (
          <MovieCard
            key={item.id}
            item={item}
            isFavorite={favoriteIds.has(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
