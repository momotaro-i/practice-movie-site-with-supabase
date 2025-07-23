'use client';

import { TItem } from '@/types';
import Image from 'next/image';
import { FaRegStar, FaStar } from 'react-icons/fa';

interface MovieCardProps {
  item: TItem & { like_count: number };
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const MovieCard = ({ item, isFavorite, onToggleFavorite }: MovieCardProps) => {
  return (
    <div className='mt-4'>
      <div className='relative cursor-pointer' onClick={() => onToggleFavorite(item.id)}>
        <Image src={item.image_url} alt={item.title} width={200} height={133} />
        <div className='absolute bottom-2 right-2 z-10'>
          <div className='flex gap-2'>
            {isFavorite ? <FaStar color='white' size={20} /> : <FaRegStar color='white' size={20} />}
            <p className='text-white'>{item.like_count}</p>
          </div>
        </div>
      </div>
      <p className='font-bold mt-2'>{item.title}</p>
      <p>{item.description}</p>
      <p>{item.copyright}</p>
    </div>
  );
};
