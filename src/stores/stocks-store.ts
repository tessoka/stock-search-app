import { create } from "zustand";
import { persist } from "zustand/middleware";

type StocksStore = {
  favourites: string[];
  recentlyViewed: string[];

  actions: {
    toggleFavourites: (symbol: string) => void;
    updateRecentlyViewed: (symbol: string) => void;
  };
};

export const useStocksStore = create<StocksStore>()(
  persist(
    (set, get) => ({
      favourites: [],
      recentlyViewed: [],

      actions: {
        toggleFavourites: (symbol) => {
          const isFavorite = get().favourites.includes(symbol);
          if (isFavorite) {
            set((state) => ({
              favourites: state.favourites.filter((fav) => fav !== symbol),
            }));
          } else {
            set((state) => ({
              favourites: [...state.favourites, symbol],
            }));
          }
        },
        updateRecentlyViewed: (symbol) => {
          set((state) => ({
            recentlyViewed: [
              symbol,
              ...state.recentlyViewed.filter((s) => s !== symbol),
            ].slice(0, 10),
          }));
        },
      },
    }),
    {
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => key !== "actions")
        ),
      name: "stocks-storage",
      version: 1,
    }
  )
);
