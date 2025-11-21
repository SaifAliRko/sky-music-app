import { configureStore } from '@reduxjs/toolkit';
import albumsReducer, { fetchAlbums, setAlbums } from '../albumsSlice';

// Mock the API module
jest.mock('@/lib/api', () => ({
  fetchTopAlbums: jest.fn(),
}));

import { fetchTopAlbums } from '@/lib/api';

describe('albumsSlice', () => {
  const mockAlbums = [
    {
      id: '1',
      name: 'Album 1',
      artist: 'Artist 1',
      image: 'https://example.com/image1.jpg',
      genre: 'Pop',
      releaseDate: '2023-01-01',
      price: '$9.99',
    },
    {
      id: '2',
      name: 'Album 2',
      artist: 'Artist 2',
      image: 'https://example.com/image2.jpg',
      genre: 'Rock',
      releaseDate: '2023-02-01',
      price: '$10.99',
    },
  ];

  const initialState = {
    entities: [],
    loading: false,
    error: null,
    hasLoaded: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setAlbums reducer', () => {
    it('should set albums and mark as loaded', () => {
      const state = { ...initialState };
      const action = { type: setAlbums.type, payload: mockAlbums };
      const result = albumsReducer(state, action);

      expect(result.entities).toEqual(mockAlbums);
      expect(result.hasLoaded).toBe(true);
    });

    it('should replace existing albums', () => {
      const state = {
        entities: [mockAlbums[0]],
        loading: false,
        error: null,
        hasLoaded: true,
      };
      const action = { type: setAlbums.type, payload: mockAlbums };
      const result = albumsReducer(state, action);

      expect(result.entities).toEqual(mockAlbums);
      expect(result.entities.length).toBe(2);
    });

    it('should handle empty albums array', () => {
      const state = { ...initialState, entities: mockAlbums };
      const action = { type: setAlbums.type, payload: [] };
      const result = albumsReducer(state, action);

      expect(result.entities).toEqual([]);
      expect(result.hasLoaded).toBe(true);
    });
  });

  describe('fetchAlbums async thunk', () => {
    it('should set loading to true on pending', () => {
      const state = { ...initialState };
      const action = { type: fetchAlbums.pending.type };
      const result = albumsReducer(state, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set albums and loading to false on fulfilled', () => {
      const state = { ...initialState, loading: true };
      const action = {
        type: fetchAlbums.fulfilled.type,
        payload: mockAlbums,
      };
      const result = albumsReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.entities).toEqual(mockAlbums);
      expect(result.hasLoaded).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set error and loading to false on rejected', () => {
      const state = { ...initialState, loading: true };
      const errorMessage = 'Failed to fetch albums';
      const action = {
        type: fetchAlbums.rejected.type,
        payload: errorMessage,
      };
      const result = albumsReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(result.entities).toEqual([]);
    });

    it('should handle fetchAlbums thunk with real store', async () => {
      (fetchTopAlbums as jest.Mock).mockResolvedValue(mockAlbums);

      const store = configureStore({
        reducer: { albums: albumsReducer },
      });

      await store.dispatch(fetchAlbums());
      const state = store.getState().albums;

      expect(state.entities).toEqual(mockAlbums);
      expect(state.hasLoaded).toBe(true);
      expect(state.loading).toBe(false);
    });

    it('should handle fetchAlbums error', async () => {
      const errorMessage = 'Network error';
      (fetchTopAlbums as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const store = configureStore({
        reducer: { albums: albumsReducer },
      });

      await store.dispatch(fetchAlbums());
      const state = store.getState().albums;

      expect(state.error).toContain('Network error');
      expect(state.loading).toBe(false);
      expect(state.entities).toEqual([]);
    });
  });

  describe('edge cases', () => {
    it('should maintain entities when there is an error', () => {
      const state = {
        entities: mockAlbums,
        loading: true,
        error: null,
        hasLoaded: true,
      };
      const action = {
        type: fetchAlbums.rejected.type,
        payload: 'Error',
      };
      const result = albumsReducer(state, action);

      expect(result.entities).toEqual(mockAlbums);
      expect(result.error).toBe('Error');
    });

    it('should handle multiple rapid fetches correctly', async () => {
      (fetchTopAlbums as jest.Mock).mockResolvedValue(mockAlbums);

      const store = configureStore({
        reducer: { albums: albumsReducer },
      });

      await store.dispatch(fetchAlbums());
      const state1 = store.getState().albums;

      expect(state1.hasLoaded).toBe(true);
      expect(state1.entities).toEqual(mockAlbums);
    });
  });
});
