import { Database } from '@/types/supabase';

export type TTheme = Database['public']['Tables']['themes']['Row'];
export type TCollection = Database['public']['Tables']['collections']['Row'];
export type TItem = Database['public']['Tables']['items']['Row'];
export type TCategory = Database['public']['Tables']['categories']['Row'];
export type TUserFavorite = Database['public']['Tables']['favorites']['Row'];
export type TItemsFavoriteCount = Database['public']['Views']['favorite_counts']['Row'];

export type TResponse = {
  collections: (TCollection & {
    items: TItem[];
  })[];
  id: number;
  name: string;
};

// favorite_countを加えたデータ（画面やロジックで使用）
export type TMoviesInfoWithFavorites = {
  collections: TCollectionWithFavorites[];
  id: number;
  name: string;
};

export type TCollectionWithFavorites = TCollection & {
  items: TItemWithFavoriteCount[];
};

export type TItemWithFavoriteCount = TItem & {
  favorite_count: number;
};

export type TUser = {
  email: string;
  id: string;
  is_mail_confirmed: boolean;
  role: string;
};
