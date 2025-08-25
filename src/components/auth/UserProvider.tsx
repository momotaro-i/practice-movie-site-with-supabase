'use client';

import { User } from '@supabase/supabase-js';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

// UserContextを作成
export const UserContext = createContext<User | null>(null);

type Props = { children: ReactNode };
export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // TOKEN_REFRESHED は無視（同じユーザーでの再レンダーを避ける）
      if (event === 'TOKEN_REFRESHED') return;

      setUser(session?.user ?? null);

      // 初期ロード完了は INITIAL_SESSION のときだけ
      if (event === 'INITIAL_SESSION') {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <FullScreenLoader />;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
