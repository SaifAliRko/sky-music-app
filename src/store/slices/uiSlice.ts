import { getTheme, saveTheme } from "@/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SortOption = "name" | "artist" | "genre";
type ThemeMode = "light" | "dark";

interface UIState {
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

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
      saveTheme(action.payload);
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      saveTheme(state.theme);
    },
  },
});

export const { setTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
