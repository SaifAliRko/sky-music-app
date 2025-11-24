import { fetchTopAlbums } from '@/lib/api';
import type { Album } from '@/lib/itunes.types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlbumsState {
  entities: Album[];
  loading: boolean;
  error: string | null;
  hasLoaded: boolean;
}

const initialState: AlbumsState = {
  entities: [],
  loading: false,
  error: null,
  hasLoaded: false,
};

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTopAlbums();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch albums';
      return rejectWithValue(message);
    }
  }
);

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.entities = action.payload;
      state.hasLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAlbums.fulfilled,
        (state, action: PayloadAction<Album[]>) => {
          state.loading = false;
          state.entities = action.payload;
          state.hasLoaded = true;
        }
      )
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAlbums } = albumsSlice.actions;
export default albumsSlice.reducer;