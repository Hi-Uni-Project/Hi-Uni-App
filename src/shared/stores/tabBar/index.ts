import { create } from 'zustand';

interface TabBarStore {
  isVisible: boolean;
  hideTabBar: () => void;
  showTabBar: () => void;
}

export const useTabBarStore = create<TabBarStore>(set => ({
  isVisible: true,
  hideTabBar: () => set({ isVisible: false }),
  showTabBar: () => set({ isVisible: true }),
}));
