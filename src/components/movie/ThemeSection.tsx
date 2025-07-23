'use client';

import { TItemsDataWithFavoriteCount } from '@/types';
import clsx from 'clsx';
import { CollectionSection } from './CollectionSection';

interface ThemeSectionProps {
  theme: TItemsDataWithFavoriteCount;
  index: number;
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
}

export const ThemeSection = ({ theme, index, favoriteIds, onToggleFavorite }: ThemeSectionProps) => {
  return (
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
          <CollectionSection
            key={collection.id}
            collection={collection}
            favoriteIds={favoriteIds}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
    </div>
  );
};
