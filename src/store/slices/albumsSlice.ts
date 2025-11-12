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
      const albums = await fetchTopAlbums();
      return albums;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch albums'
      );
    }
  }
);

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  },
});

export default albumsSlice.reducer;