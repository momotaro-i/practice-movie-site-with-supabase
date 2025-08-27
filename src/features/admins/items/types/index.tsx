import { TItem } from '@/types';

export type TAdminItem = TItem & {
  sub_theme: {
    id: number;
    theme: {
      id: number;
      name: string;
    };
    title: string;
  };
};

export type RowData = {
  copyright: string;
  description: string;
  id: string;
  image_url: string;
  platform: string;
  platform_url: string;
  subTheme: string;
  theme: string;
  title: string;
};
