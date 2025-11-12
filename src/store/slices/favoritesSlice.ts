import { saveFavorites } from "@/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  ids: string[];
  initialized: boolean;
}

const initialState: FavoritesState = {
  ids: [],
  initialized: false,
};

const favoritesSlice = createSlice({
  name: "favorites",
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

      // Persist to localStorage
      saveFavorites(state.ids);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
