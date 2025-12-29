import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SearchHistoryStore {
  recentSearches: string[];
  addSearch: (searchText: string, maxItems: number) => void;
  removeSearch: (searchText: string) => void;
  clearAll: () => void;
}

const initialState = {
  recentSearches: [] as string[],
};

export const useSearchHistoryStore = create<SearchHistoryStore>()(
  persist(
    set => ({
      ...initialState,

      addSearch: (searchText, maxItems) =>
        set(state => {
          const trimmed = searchText.trim();
          if (!trimmed) {
            return state;
          }

          const filtered = state.recentSearches.filter(
            item => item !== trimmed,
          );
          const updated = [trimmed, ...filtered];

          if (updated.length > maxItems) {
            updated.pop();
          }

          return { recentSearches: updated };
        }),

      removeSearch: searchText =>
        set(state => ({
          recentSearches: state.recentSearches.filter(
            item => item !== searchText,
          ),
        })),

      clearAll: () => set({ recentSearches: [] }),
    }),
    {
      name: 'search-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
