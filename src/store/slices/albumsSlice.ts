import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlbumsState {
  entities: any[];
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
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default albumsSlice.reducer;