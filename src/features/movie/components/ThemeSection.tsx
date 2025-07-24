'use client';

import { Box, Flex, Title } from '@mantine/core';
import styled from 'styled-components';

import { TMoviesInfoWithFavorites } from '@/types';

import { CollectionSection } from './CollectionSection';

interface ThemeSectionProps {
  favoriteIds: Set<number>;
  index: number;
  onToggleFavorite: (id: number) => void;
  theme: TMoviesInfoWithFavorites;
}

export const ThemeSection = ({ favoriteIds, onToggleFavorite, theme }: ThemeSectionProps) => {
  return (
    <Box>
      <STitle order={2}>{theme.name}</STitle>
      <Flex direction='column' gap='20px'>
        {theme.collections
          ?.filter((col) => col.theme_id === theme.id)
          .map((collection) => (
            <CollectionSection
              collection={collection}
              favoriteIds={favoriteIds}
              key={collection.id}
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
