import { fetchAlbumDetails } from '@/lib/api';
import type { ITunesTrack } from '@/lib/itunes.types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlbumDetailsState {
  tracks: ITunesTrack[];
  loading: boolean;
  error: string | null;
  currentAlbumId: string | null;
}

const initialState: AlbumDetailsState = {
  tracks: [],
  loading: false,
  error: null,
  currentAlbumId: null,
};

/**
 * Async thunk to fetch album details and tracks
 * Returns the raw iTunes lookup response with tracks
 */
export const fetchAlbumTracks = createAsyncThunk(
  'albumDetails/fetchTracks',
  async (albumId: string, { rejectWithValue }) => {
    try {
      const data = await fetchAlbumDetails(albumId);
      
      // Extract tracks from results (skip first which is album info)
      const tracks = data.results
        .slice(1)
        .filter((result): result is ITunesTrack => 'trackId' in result)
        .map((track) => ({
          trackId: track.trackId,
          trackName: track.trackName,
          trackNumber: track.trackNumber,
          trackTimeMillis: track.trackTimeMillis,
          previewUrl: track.previewUrl,
        }));
      
      return { albumId, tracks };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch album details'
      );
    }
  }
);

const albumDetailsSlice = createSlice({
  name: 'albumDetails',
  initialState,
  reducers: {
    clearTracks: (state) => {
      state.tracks = [];
      state.currentAlbumId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAlbumTracks.fulfilled,
        (state, action: PayloadAction<{ albumId: string; tracks: ITunesTrack[] }>) => {
          state.loading = false;
          state.tracks = action.payload.tracks;
          state.currentAlbumId = action.payload.albumId;
          state.error = null;
        }
      )
      .addCase(fetchAlbumTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.tracks = [];
      });
  },
});

export const { clearTracks } = albumDetailsSlice.actions;
export default albumDetailsSlice.reducer;
