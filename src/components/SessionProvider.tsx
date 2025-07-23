'use client';

import { Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext } from 'react';

type SessionContextType = Session | null;

const SessionContext = createContext<SessionContextType>(null);

export const SessionProvider = ({ session, children }: { session: Session | null; children: ReactNode }) => {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};

export const useSession = () => useContext(SessionContext);
