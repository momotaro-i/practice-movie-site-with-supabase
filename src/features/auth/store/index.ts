import { createSelectors } from '@/stores';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TUser = {
  email: string;
  password: string;
};

type TAuthState = {
  isLoggedIn: boolean;
  user: TUser | null;
  login: (user: TUser) => void;
  logout: () => void;
  rehydrated: boolean;
  setRehydrated: () => void;
};

// セッションストレージを使った例
const useAuthStoreBase = create<TAuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null }),
      rehydrated: false,
      setRehydrated: () => set({ rehydrated: true }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }), //userだけストレージで管理
      skipHydration: true,
    }
  )
);

export const useAuthStore = createSelectors(useAuthStoreBase);
