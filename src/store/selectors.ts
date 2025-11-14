import type { RootState } from '@/store';
import { filterAndSortAlbums } from '@/utils/search';
import { createSelector } from '@reduxjs/toolkit';

/**
 * Memoized selectors for Redux state
 * These prevent unnecessary re-renders by caching results
 */

// Basic selectors
export const selectAlbums = (state: RootState) => state.albums.entities;
export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectSearchQuery = (state: RootState) => state.ui.searchQuery;
export const selectSortBy = (state: RootState) => state.ui.sortBy;
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectAlbumDetails = (state: RootState) => state.albumDetails;

// Memoized selector for filtered and sorted albums
export const selectFilteredAndSortedAlbums = createSelector(
  [selectAlbums, selectSearchQuery, selectSortBy],
  (albums, searchQuery, sortBy) => filterAndSortAlbums(albums, searchQuery, sortBy)
);

// Memoized selector for favorite albums
export const selectFavoriteAlbums = createSelector(
  [selectAlbums, selectFavoriteIds],
  (albums, favoriteIds) => albums.filter((album) => favoriteIds.includes(album.id))
);

// Memoized selector factory for checking if an album is favorited
export const makeSelectIsFavorite = (albumId: string) =>
  createSelector([selectFavoriteIds], (favoriteIds) => favoriteIds.includes(albumId));
