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
      const index = state.ids.indexOf(id);

      if (index === -1) {
        // Add to favorites
        state.ids.push(id);
      } else {
        // Remove from favorites
        state.ids.splice(index, 1);
      }

    },

    addFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.ids.includes(id)) {
        state.ids.push(id);
      }
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.ids.indexOf(id);
      if (index !== -1) {
        state.ids.splice(index, 1);
      }
    },

    initializeFavorites: (state, action: PayloadAction<string[]>) => {
      // Ensure no duplicates
      state.ids = Array.from(new Set(action.payload));
      state.initialized = true;
    },
  },
});

export const {
  toggleFavorite,
  addFavorite,
  removeFavorite,
  initializeFavorites,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;