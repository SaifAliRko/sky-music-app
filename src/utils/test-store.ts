import albumDetailsReducer from '@/store/slices/albumDetailsSlice';
import albumsReducer from '@/store/slices/albumsSlice';
import favoritesReducer from '@/store/slices/favoritesSlice';
import uiReducer from '@/store/slices/uiSlice';
import { configureStore } from '@reduxjs/toolkit';

/**
 * Create a test store with all reducers
 * Used across component tests for consistent setup
 */
export const createTestStore = () =>
  configureStore({
    reducer: {
      albums: albumsReducer,
      albumDetails: albumDetailsReducer,
      favorites: favoritesReducer,
      ui: uiReducer,
    },
  });
