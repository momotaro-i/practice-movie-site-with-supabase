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
  platform: string;
  platform_url: string;
  sub_theme: string;
  theme: string;
  thumbnail_url: string;
  title: string;
};
