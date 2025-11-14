import { configureStore } from '@reduxjs/toolkit';
import albumDetailsReducer from './slices/albumDetailsSlice';
import albumsReducer from './slices/albumsSlice';
import favoritesReducer from './slices/favoritesSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    albumDetails: albumDetailsReducer,
    favorites: favoritesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;