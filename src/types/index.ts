import { Database } from "@/types/supabase";

export  type TTheme =  Database['public']['Tables']['themes']['Row']
export  type TCollection =  Database['public']['Tables']['collections']['Row']
export  type TItem =  Database['public']['Tables']['items']['Row']
export  type TUserFavorite =  Database['public']['Tables']['favorites']['Row']
export  type TItemsFavoriteCount =  Database['public']['Views']['favorite_counts']['Row']



export type TResponse = {
  id: number;
  name: string;
  collections: (TCollection & {
    items: TItem[];
})[]
}

export type TItemsDataWithFavoriteCount = Omit<TResponse, 'collections'> & {
  collections: (TCollection & {
    items: (TItem & {
      like_count: number
    })[];
})[]
}
