// lib/store/useGlobalStore.ts
import { create } from 'zustand'

interface GlobalState {
  isDark: boolean
  toggleTheme: () => void
  isLoading: boolean
  setLoading: (value: boolean) => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
}))
