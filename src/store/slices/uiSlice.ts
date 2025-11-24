import { getTheme, saveTheme } from "@/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SortOption = "name" | "artist" | "genre";
type ThemeMode = "light" | "dark";

export interface UIState {
  theme: ThemeMode;
  searchQuery: string;
  sortBy: SortOption;
  filterGenre: string | null;
}

const initialState: UIState = {
  theme: typeof window !== "undefined" ? getTheme() : "light",
  searchQuery: "",
  sortBy: "name",
  filterGenre: null,
};

const saveThemeHelper = (theme: ThemeMode): ThemeMode => {
  saveTheme(theme);
  return theme;
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = saveThemeHelper(action.payload);
    },

    toggleTheme: (state) => {
      state.theme = saveThemeHelper(
        state.theme === "light" ? "dark" : "light"
      );
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },

    setFilterGenre: (state, action: PayloadAction<string | null>) => {
      state.filterGenre = action.payload;
    },

    clearFilters: (state) => {
      state.searchQuery = "";
      state.filterGenre = null;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setSearchQuery,
  setSortBy,
  setFilterGenre,
  clearFilters,
} = uiSlice.actions;
export default uiSlice.reducer;
