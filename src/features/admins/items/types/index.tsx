import { TItem } from '@/types';

export type TAdminItem = TItem & {
  categories: {
    id: number;
    name: string;
  }[];
  sub_theme: {
    id: number;
    theme: {
      id: number;
      name: string;
    };
    title: string;
  };
};

export type TRowData = {
  category: string;
  collection_id: number;
  copyright: string;
  description: string;
  id: number;
  thumbnail_url: string;
  platform: string;
  platform_url: string;
  sub_theme: string;
  theme: string;
  title: string;
};
