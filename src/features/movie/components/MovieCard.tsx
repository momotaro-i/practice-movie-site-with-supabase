'use client';

import { TItemWithFavoriteCount } from '@/types';
import { Box, Skeleton, Text } from '@mantine/core';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from 'styled-components';

interface MovieCardProps {
  item: TItemWithFavoriteCount;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const MovieCard = ({ item, isFavorite, onToggleFavorite }: MovieCardProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Box>
      <SImageWrapper>
        {!loaded && <Skeleton w='100%' h='100%' radius='sm' />}
        <Image src={item.image_url} alt={item.title} fill onLoad={() => setLoaded(true)} />
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
