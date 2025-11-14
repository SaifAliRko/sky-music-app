import favoritesReducer, {
  toggleFavorite,
  addFavorite,
  removeFavorite,
  initializeFavorites,
} from '../favoritesSlice';

// Mock the storage module
jest.mock('@/lib/storage', () => ({
  saveFavorites: jest.fn(),
}));

describe('favoritesSlice', () => {
  const initialState = {
    ids: [],
    initialized: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('toggleFavorite', () => {
    it('should add favorite when not already favorited', () => {
      const state = { ...initialState, ids: [] };
      const action = { type: toggleFavorite.type, payload: 'album-1' };
      const result = favoritesReducer(state, action);
      expect(result.ids).toContain('album-1');
    });

    it('should remove favorite when already favorited', () => {
      const state = { ...initialState, ids: ['album-1'] };
      const action = { type: toggleFavorite.type, payload: 'album-1' };
      const result = favoritesReducer(state, action);
      expect(result.ids).not.toContain('album-1');
    });

    it('should handle multiple favorites correctly', () => {
      const state = { ...initialState, ids: ['album-1', 'album-2'] };
      const action = { type: toggleFavorite.type, payload: 'album-2' };
      const result = favoritesReducer(state, action);
      expect(result.ids).toEqual(['album-1']);
    });
  });

  describe('addFavorite', () => {
    it('should add a favorite', () => {
      const state = { ...initialState, ids: [] };
      const action = { type: addFavorite.type, payload: 'album-1' };
      const result = favoritesReducer(state, action);
      expect(result.ids).toContain('album-1');
    });

    it('should not add duplicate favorites', () => {
      const state = { ...initialState, ids: ['album-1'] };
      const action = { type: addFavorite.type, payload: 'album-1' };
      const result = favoritesReducer(state, action);
      expect(result.ids).toEqual(['album-1']);
      expect(result.ids.length).toBe(1);
    });

    it('should add multiple different favorites', () => {
      const state = { ...initialState, ids: ['album-1'] };
      const action = { type: addFavorite.type, payload: 'album-2' };
      const result = favoritesReducer(state, action);
      expect(result.ids).toEqual(['album-1', 'album-2']);
    });
  });

  describe('removeFavorite', () => {
    it('should remove a favorite', () => {
      const state = { ...initialState, ids: ['album-1', 'album-2'] };
      const action = { type: removeFavorite.type, payload: 'album-1' };
      const result = favoritesReducer(state, action);
      expect(result.ids).toEqual(['album-2']);
    });

    it('should handle removing non-existent favorite', () => {
      const state = { ...initialState, ids: ['album-1'] };
      const action = { type: removeFavorite.type, payload: 'album-999' };
      const result = favoritesReducer(state, action);
      expect(result.ids).toEqual(['album-1']);
    });

    it('should handle removing from empty state', () => {
      const state = { ...initialState, ids: [] };
      const action = { type: removeFavorite.type, payload: 'album-1' };
      const result = favoritesReducer(state, action);
      expect(result.ids).toEqual([]);
    });
  });

  describe('initializeFavorites', () => {
    it('should initialize favorites from array', () => {
      const state = { ...initialState };
      const action = {
        type: initializeFavorites.type,
        payload: ['album-1', 'album-2', 'album-3'],
      };
      const result = favoritesReducer(state, action);
      expect(result.ids).toEqual(['album-1', 'album-2', 'album-3']);
      expect(result.initialized).toBe(true);
    });

    it('should deduplicate favorites using Set', () => {
      const state = { ...initialState };
      const action = {
        type: initializeFavorites.type,
        payload: ['album-1', 'album-2', 'album-1', 'album-3', 'album-2'],
      };
      const result = favoritesReducer(state, action);
      expect(result.ids).toEqual(['album-1', 'album-2', 'album-3']);
      expect(result.ids.length).toBe(3);
    });

    it('should set initialized flag to true', () => {
      const state = { ...initialState, initialized: false };
      const action = {
        type: initializeFavorites.type,
        payload: ['album-1'],
      };
      const result = favoritesReducer(state, action);
      expect(result.initialized).toBe(true);
    });

    it('should handle empty array', () => {
      const state = { ...initialState };
      const action = { type: initializeFavorites.type, payload: [] };
      const result = favoritesReducer(state, action);
      expect(result.ids).toEqual([]);
      expect(result.initialized).toBe(true);
    });
  });
});
