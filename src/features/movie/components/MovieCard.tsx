'use client';

import { Box, Skeleton, Text } from '@mantine/core';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from 'styled-components';

import { getPublicThumbUrl } from '@/utils/fetch/thumb';

import { TItemWithFavoriteCount } from '@/types';

interface MovieCardProps {
  isFavorite: boolean;
  item: TItemWithFavoriteCount;
  onToggleFavorite: (id: number) => void;
}

export const MovieCard = ({ isFavorite, item, onToggleFavorite }: MovieCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const url = item.thumbnail_path
    ? getPublicThumbUrl(item.thumbnail_path) // 新規（Storage）
    : item.thumbnail_url ?? ''; // 既存（外部URL）

  return (
    <Box>
      <SImageWrapper>
        {!loaded && <Skeleton h='100%' radius='sm' w='100%' />}
        <Image fill alt={item.title} src={url} onLoad={() => setLoaded(true)} />
        <SFavoriteButton onClick={() => onToggleFavorite(item.id)}>
          <SStarIcon>
            {isFavorite ? <FaStar color='white' size={20} /> : <FaRegStar color='white' size={20} />}
          </SStarIcon>
          {item.favorite_count !== undefined && <Text size='md'>{item.favorite_count}</Text>}
        </SFavoriteButton>
      </SImageWrapper>
      <Text className='u-mt--5'>{item.title}</Text>
      <Text size='sm'>{item.description}</Text>
      <Text size='xs'>{item.copyright}</Text>
    </Box>
  );
};

const SImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 3/2;
  width: 300px;
  height: auto;
`;

const SFavoriteButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

const SStarIcon = styled.div`
  width: 20px;
  height: 20px;
`;
