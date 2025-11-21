import type { UIState } from '../uiSlice';
import uiReducer, {
    clearFilters,
    setFilterGenre,
    setSearchQuery,
    setSortBy,
    setTheme,
    toggleTheme,
} from '../uiSlice';

// Mock the storage module
jest.mock('@/lib/storage', () => ({
  saveTheme: jest.fn(),
  getTheme: jest.fn(() => 'light'),
}));

import { saveTheme } from '@/lib/storage';

describe('uiSlice', () => {
  const initialState: UIState = {
    theme: 'light',
    searchQuery: '',
    sortBy: 'name',
    filterGenre: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setTheme', () => {
    it('should set theme to dark', () => {
      const state: UIState = { ...initialState };
      const action = { type: setTheme.type, payload: 'dark' as const };
      const result = uiReducer(state, action);

      expect(result.theme).toBe('dark');
      expect(saveTheme).toHaveBeenCalledWith('dark');
    });

    it('should set theme to light', () => {
      const state: UIState = { ...initialState, theme: 'dark' };
      const action = { type: setTheme.type, payload: 'light' as const };
      const result = uiReducer(state, action);

      expect(result.theme).toBe('light');
      expect(saveTheme).toHaveBeenCalledWith('light');
    });

    it('should save theme to localStorage', () => {
      const state: UIState = { ...initialState };
      const action = { type: setTheme.type, payload: 'dark' as const };
      uiReducer(state, action);

      expect(saveTheme).toHaveBeenCalledWith('dark');
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark', () => {
      const state: UIState = { ...initialState, theme: 'light' };
      const action = { type: toggleTheme.type };
      const result = uiReducer(state, action);

      expect(result.theme).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      const state: UIState = { ...initialState, theme: 'dark' };
      const action = { type: toggleTheme.type };
      const result = uiReducer(state, action);

      expect(result.theme).toBe('light');
    });

    it('should save toggled theme to localStorage', () => {
      const state: UIState = { ...initialState, theme: 'light' };
      const action = { type: toggleTheme.type };
      uiReducer(state, action);

      expect(saveTheme).toHaveBeenCalledWith('dark');
    });

    it('should toggle multiple times correctly', () => {
      let state: UIState = { ...initialState, theme: 'light' };

      state = uiReducer(state, { type: toggleTheme.type });
      expect(state.theme).toBe('dark');

      state = uiReducer(state, { type: toggleTheme.type });
      expect(state.theme).toBe('light');

      state = uiReducer(state, { type: toggleTheme.type });
      expect(state.theme).toBe('dark');
    });
  });

  describe('setSearchQuery', () => {
    it('should set search query', () => {
      const state = { ...initialState };
      const action = { type: setSearchQuery.type, payload: 'test query' };
      const result = uiReducer(state, action);

      expect(result.searchQuery).toBe('test query');
    });

    it('should replace existing search query', () => {
      const state = { ...initialState, searchQuery: 'old query' };
      const action = { type: setSearchQuery.type, payload: 'new query' };
      const result = uiReducer(state, action);

      expect(result.searchQuery).toBe('new query');
    });

    it('should handle empty search query', () => {
      const state = { ...initialState, searchQuery: 'query' };
      const action = { type: setSearchQuery.type, payload: '' };
      const result = uiReducer(state, action);

      expect(result.searchQuery).toBe('');
    });

    it('should handle special characters in search query', () => {
      const state = { ...initialState };
      const specialQuery = '@#$%^&*()!';
      const action = { type: setSearchQuery.type, payload: specialQuery };
      const result = uiReducer(state, action);

      expect(result.searchQuery).toBe(specialQuery);
    });
  });

  describe('setSortBy', () => {
    it('should set sort by name', () => {
      const state: UIState = { ...initialState };
      const action = { type: setSortBy.type, payload: 'name' as const };
      const result = uiReducer(state, action);

      expect(result.sortBy).toBe('name');
    });

    it('should set sort by artist', () => {
      const state: UIState = { ...initialState };
      const action = { type: setSortBy.type, payload: 'artist' as const };
      const result = uiReducer(state, action);

      expect(result.sortBy).toBe('artist');
    });

    it('should set sort by genre', () => {
      const state: UIState = { ...initialState };
      const action = { type: setSortBy.type, payload: 'genre' as const };
      const result = uiReducer(state, action);

      expect(result.sortBy).toBe('genre');
    });

    it('should replace existing sort option', () => {
      const state: UIState = { ...initialState, sortBy: 'artist' };
      const action = { type: setSortBy.type, payload: 'genre' as const };
      const result = uiReducer(state, action);

      expect(result.sortBy).toBe('genre');
    });
  });

  describe('setFilterGenre', () => {
    it('should set filter genre', () => {
      const state: UIState = { ...initialState };
      const action = { type: setFilterGenre.type, payload: 'Rock' };
      const result = uiReducer(state, action);

      expect(result.filterGenre).toBe('Rock');
    });

    it('should replace existing filter genre', () => {
      const state: UIState = { ...initialState, filterGenre: 'Pop' };
      const action = { type: setFilterGenre.type, payload: 'Jazz' };
      const result = uiReducer(state, action);

      expect(result.filterGenre).toBe('Jazz');
    });

    it('should set filter genre to null', () => {
      const state: UIState = { ...initialState, filterGenre: 'Rock' };
      const action = { type: setFilterGenre.type, payload: null };
      const result = uiReducer(state, action);

      expect(result.filterGenre).toBeNull();
    });

    it('should handle various genre names', () => {
      const genres = ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip Hop', 'Electronic'];
      let state: UIState = { ...initialState };

      genres.forEach((genre) => {
        const action = { type: setFilterGenre.type, payload: genre };
        state = uiReducer(state, action);
        expect(state.filterGenre).toBe(genre);
      });
    });
  });

  describe('clearFilters', () => {
    it('should clear search query and filter genre', () => {
      const state: UIState = {
        ...initialState,
        searchQuery: 'test',
        filterGenre: 'Rock',
      };
      const action = { type: clearFilters.type };
      const result = uiReducer(state, action);

      expect(result.searchQuery).toBe('');
      expect(result.filterGenre).toBeNull();
    });

    it('should preserve other state properties when clearing filters', () => {
      const state: UIState = {
        theme: 'dark',
        searchQuery: 'test',
        sortBy: 'artist',
        filterGenre: 'Pop',
      };
      const action = { type: clearFilters.type };
      const result = uiReducer(state, action);

      expect(result.theme).toBe('dark');
      expect(result.sortBy).toBe('artist');
      expect(result.searchQuery).toBe('');
      expect(result.filterGenre).toBeNull();
    });

    it('should handle clearing empty filters', () => {
      const state: UIState = { ...initialState };
      const action = { type: clearFilters.type };
      const result = uiReducer(state, action);

      expect(result.searchQuery).toBe('');
      expect(result.filterGenre).toBeNull();
    });

    it('should allow re-setting filters after clear', () => {
      let state: UIState = {
        theme: 'light',
        searchQuery: 'test',
        sortBy: 'name',
        filterGenre: 'Rock',
      };

      // Clear filters
      state = uiReducer(state, { type: clearFilters.type });
      expect(state.searchQuery).toBe('');
      expect(state.filterGenre).toBeNull();

      // Set new filters
      state = uiReducer(state, {
        type: setSearchQuery.type,
        payload: 'new search',
      });
      state = uiReducer(state, {
        type: setFilterGenre.type,
        payload: 'Pop',
      });

      expect(state.searchQuery).toBe('new search');
      expect(state.filterGenre).toBe('Pop');
    });
  });

  describe('complex scenarios', () => {
    it('should handle multiple state changes in sequence', () => {
      let state = { ...initialState };

      state = uiReducer(state, { type: toggleTheme.type });
      expect(state.theme).toBe('dark');

      state = uiReducer(state, {
        type: setSearchQuery.type,
        payload: 'test',
      });
      expect(state.searchQuery).toBe('test');

      state = uiReducer(state, {
        type: setSortBy.type,
        payload: 'artist',
      });
      expect(state.sortBy).toBe('artist');

      state = uiReducer(state, {
        type: setFilterGenre.type,
        payload: 'Rock',
      });
      expect(state.filterGenre).toBe('Rock');

      expect(state).toEqual({
        theme: 'dark',
        searchQuery: 'test',
        sortBy: 'artist',
        filterGenre: 'Rock',
      });
    });

    it('should maintain state immutability', () => {
      const state = { ...initialState };
      const stateCopy = { ...state };

      uiReducer(state, { type: toggleTheme.type });

      expect(state).toEqual(stateCopy);
    });
  });
});
