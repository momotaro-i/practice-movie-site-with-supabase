'use client';

import { User } from '@supabase/supabase-js';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

// UserContextを作成
export const UserContext = createContext<User | null>(null);

type Props = { children: ReactNode };

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // 初期ユーザー情報を取得
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
