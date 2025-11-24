import { saveFavorites } from '@/lib/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  ids: string[];
  initialized: boolean;
}

const initialState: FavoritesState = {
  ids: [],
  initialized: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((fav) => fav !== id);
      } else {
        state.ids.push(id);
      }
      saveFavorites(state.ids);
    },

    initializeFavorites: (state, action: PayloadAction<string[]>) => {
      state.ids = Array.from(new Set(action.payload));
      state.initialized = true;
    },
  },
});

export const {
  toggleFavorite,
  initializeFavorites,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;