'use client';

import { TItemsDataWithFavoriteCount } from '@/types';
import { Box, Flex, Title } from '@mantine/core';
import styled from 'styled-components';
import { CollectionSection } from './CollectionSection';

interface ThemeSectionProps {
  theme: TItemsDataWithFavoriteCount;
  index: number;
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
}

export const ThemeSection = ({ theme, index, favoriteIds, onToggleFavorite }: ThemeSectionProps) => {
  return (
    <Box>
      <STitle order={2}>{theme.name}</STitle>
      <Flex direction='column' gap='20px'>
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
      </Flex>
    </Box>
  );
};

const STitle = styled(Title)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &::before {
    content: "'";
    display: block;
    width: 0.3rem;
    height: 100%;
    background-color: var(--white);
  }
`;
