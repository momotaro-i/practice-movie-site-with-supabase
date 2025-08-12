export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.12 (cd3cf9e)';
  };
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      get_user_admin_emails: {
        Args: Record<string, never>;
        Returns: Array<{
          email: string;
          id: string;
        }>;
      };
    };
    Tables: {
      collections: {
        Insert: {
          description: string;
          id?: number;
          is_active: boolean;
          theme_id: number;
          title: string;
        };
        Relationships: [
          {
            columns: ['theme_id'];
            foreignKeyName: 'collections_theme_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'themes';
          }
        ];
        Row: {
          description: string;
          id: number;
          is_active: boolean;
          theme_id: number;
          title: string;
        };
        Update: {
          description?: string;
          id?: number;
          is_active?: boolean;
          theme_id?: number;
          title?: string;
        };
      };
      favorites: {
        Insert: {
          created_at?: string;
          id?: number;
          title_id: number;
          user_id: string;
        };
        Relationships: [
          {
            columns: ['title_id'];
            foreignKeyName: 'favorites_title_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'items';
          }
        ];
        Row: {
          created_at: string;
          id: number;
          title_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          title_id?: number;
          user_id?: string;
        };
      };
      items: {
        Insert: {
          category: string;
          collection_id: number;
          copyright: string;
          description: string;
          id?: number;
          image_url: string;
          platform: string;
          platform_url: string;
          title: string;
        };
        Relationships: [
          {
            columns: ['collection_id'];
            foreignKeyName: 'titles_collection_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'collections';
          }
        ];
        Row: {
          category: string;
          collection_id: number;
          copyright: string;
          description: string;
          id: number;
          image_url: string;
          platform: string;
          platform_url: string;
          title: string;
        };
        Update: {
          category?: string;
          collection_id?: number;
          copyright?: string;
          description?: string;
          id?: number;
          image_url?: string;
          platform?: string;
          platform_url?: string;
          title?: string;
        };
      };
      themes: {
        Insert: {
          id?: number;
          name: string;
        };
        Relationships: [];
        Row: {
          id: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
      };
      users: {
        Insert: {
          email: string;
          id: string;
          is_mail_confirmed: boolean;
          role?: string | null;
        };
        Relationships: [];
        Row: {
          email: string;
          id: string;
          is_mail_confirmed: boolean;
          role: string | null;
        };
        Update: {
          email?: string;
          id?: string;
          is_mail_confirmed: boolean;
          role?: string | null;
        };
      };
    };
    Views: {
      favorite_counts: {
        Relationships: [
          {
            columns: ['title_id'];
            foreignKeyName: 'favorites_title_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'items';
          }
        ];
        Row: {
          like_count: number | null;
          title_id: number | null;
        };
      };
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
