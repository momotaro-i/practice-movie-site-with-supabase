import { createSelectors } from '@/stores';
import { create } from 'zustand';

type TCounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  resetCount: () => void;
};

// 通常
const useCounterBase = create<TCounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  resetCount: () => set({ count: 0 }),
}));

export const useCountStore = createSelectors(useCounterBase);
