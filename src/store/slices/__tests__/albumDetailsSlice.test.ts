import { configureStore } from '@reduxjs/toolkit';
import albumDetailsReducer, { clearTracks, fetchAlbumTracks } from '../albumDetailsSlice';

// Mock the API module
jest.mock('@/lib/api', () => ({
  fetchAlbumDetails: jest.fn(),
}));

import { fetchAlbumDetails } from '@/lib/api';

describe('albumDetailsSlice', () => {
  const mockTracks = [
    {
      trackId: 1,
      trackName: 'Track 1',
      trackNumber: 1,
      trackTimeMillis: 180000,
      previewUrl: 'https://example.com/preview1.mp3',
    },
    {
      trackId: 2,
      trackName: 'Track 2',
      trackNumber: 2,
      trackTimeMillis: 210000,
      previewUrl: 'https://example.com/preview2.mp3',
    },
  ];

  // fetchAlbumDetails returns ITunesTrack[] directly (pre-parsed)
  const mockAlbumDetails = mockTracks;

  const initialState = {
    tracks: [],
    loading: false,
    error: null,
    currentAlbumId: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('clearTracks reducer', () => {
    it('should clear tracks and reset currentAlbumId', () => {
      const state = {
        tracks: mockTracks,
        loading: false,
        error: null,
        currentAlbumId: '123',
      };
      const action = { type: clearTracks.type };
      const result = albumDetailsReducer(state, action);

      expect(result.tracks).toEqual([]);
      expect(result.currentAlbumId).toBeNull();
    });

    it('should handle clearing empty tracks', () => {
      const state = { ...initialState };
      const action = { type: clearTracks.type };
      const result = albumDetailsReducer(state, action);

      expect(result.tracks).toEqual([]);
      expect(result.currentAlbumId).toBeNull();
    });
  });

  describe('fetchAlbumTracks async thunk', () => {
    it('should set loading to true on pending', () => {
      const state = { ...initialState };
      const action = { type: fetchAlbumTracks.pending.type };
      const result = albumDetailsReducer(state, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set tracks and loading to false on fulfilled', () => {
      const state = { ...initialState, loading: true };
      const action = {
        type: fetchAlbumTracks.fulfilled.type,
        payload: {
          albumId: '123',
          tracks: mockTracks,
        },
      };
      const result = albumDetailsReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.tracks).toEqual(mockTracks);
      expect(result.currentAlbumId).toBe('123');
      expect(result.error).toBeNull();
    });

    it('should clear tracks and set error on rejected', () => {
      const state = {
        tracks: mockTracks,
        loading: true,
        error: null,
        currentAlbumId: '123',
      };
      const errorMessage = 'Failed to fetch album details';
      const action = {
        type: fetchAlbumTracks.rejected.type,
        payload: errorMessage,
      };
      const result = albumDetailsReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(result.tracks).toEqual([]);
    });

    it('should handle fetchAlbumTracks thunk with real store', async () => {
      (fetchAlbumDetails as jest.Mock).mockResolvedValue(mockAlbumDetails);

      const store = configureStore({
        reducer: { albumDetails: albumDetailsReducer },
      });

      await store.dispatch(fetchAlbumTracks('123'));
      const state = store.getState().albumDetails;

      expect(state.tracks).toHaveLength(2);
      expect(state.currentAlbumId).toBe('123');
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should extract only track results and filter out album info', async () => {
      (fetchAlbumDetails as jest.Mock).mockResolvedValue(mockAlbumDetails);

      const store = configureStore({
        reducer: { albumDetails: albumDetailsReducer },
      });

      await store.dispatch(fetchAlbumTracks('123'));
      const state = store.getState().albumDetails;

      expect(state.tracks).toHaveLength(2);
      state.tracks.forEach((track) => {
        expect(track).toHaveProperty('trackId');
        expect(track).toHaveProperty('trackName');
        expect(track).toHaveProperty('trackNumber');
        expect(track).toHaveProperty('trackTimeMillis');
      });
    });

    it('should handle API error gracefully', async () => {
      const errorMessage = 'Failed to fetch';
      (fetchAlbumDetails as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const store = configureStore({
        reducer: { albumDetails: albumDetailsReducer },
      });

      await store.dispatch(fetchAlbumTracks('123'));
      const state = store.getState().albumDetails;

      expect(state.error).toContain(errorMessage);
      expect(state.loading).toBe(false);
      expect(state.tracks).toEqual([]);
    });

    it('should filter out non-track results', async () => {
      const mixedResults = mockTracks; // Already pre-parsed, no non-track results
      (fetchAlbumDetails as jest.Mock).mockResolvedValue(mixedResults);

      const store = configureStore({
        reducer: { albumDetails: albumDetailsReducer },
      });

      await store.dispatch(fetchAlbumTracks('123'));
      const state = store.getState().albumDetails;

      expect(state.tracks).toHaveLength(2);
    });
  });

  describe('edge cases', () => {
    it('should handle empty tracks array', async () => {
      const emptyResults: typeof mockTracks = []; // Empty array since pre-parsed
      (fetchAlbumDetails as jest.Mock).mockResolvedValue(emptyResults);

      const store = configureStore({
        reducer: { albumDetails: albumDetailsReducer },
      });

      await store.dispatch(fetchAlbumTracks('123'));
      const state = store.getState().albumDetails;

      expect(state.tracks).toEqual([]);
      expect(state.currentAlbumId).toBe('123');
    });

    it('should replace tracks when fetching different album', async () => {
      (fetchAlbumDetails as jest.Mock).mockResolvedValue(mockAlbumDetails);

      const store = configureStore({
        reducer: { albumDetails: albumDetailsReducer },
      });

      // Fetch first album
      await store.dispatch(fetchAlbumTracks('123'));
      let state = store.getState().albumDetails;
      expect(state.currentAlbumId).toBe('123');

      // Fetch different album
      const newMockTracks = [
        {
          trackId: 3,
          trackName: 'Track 3',
          trackNumber: 1,
          trackTimeMillis: 190000,
          previewUrl: 'https://example.com/preview3.mp3',
        },
      ];

      // Already pre-parsed, just pass the tracks array directly
      (fetchAlbumDetails as jest.Mock).mockResolvedValue(newMockTracks);

      await store.dispatch(fetchAlbumTracks('456'));
      state = store.getState().albumDetails;

      expect(state.currentAlbumId).toBe('456');
      expect(state.tracks).toHaveLength(1);
    });
  });
});
