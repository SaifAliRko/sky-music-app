/**
 * Custom React hooks for the Sky Music application
 */

import type { Album } from '@/lib/itunes.types';
import type { RootState } from '@/store';
import { filterAndSortAlbums } from '@/utils/search';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

/**
 * Memoized selectors for Redux state
 * These prevent unnecessary re-renders by caching results
 */

// Basic selectors
const selectAlbums = (state: RootState) => state.albums.entities;
const selectFavoriteIds = (state: RootState) => state.favorites.ids;
const selectSearchQuery = (state: RootState) => state.ui.searchQuery;
const selectSortBy = (state: RootState) => state.ui.sortBy;
const selectTheme = (state: RootState) => state.ui.theme;

// Memoized selector for filtered and sorted albums
const selectFilteredAndSortedAlbums = createSelector(
  [selectAlbums, selectSearchQuery, selectSortBy],
  (albums, searchQuery, sortBy) => filterAndSortAlbums(albums, searchQuery, sortBy)
);

// Memoized selector for favorite albums
const selectFavoriteAlbums = createSelector(
  [selectAlbums, selectFavoriteIds],
  (albums, favoriteIds) => albums.filter((album) => favoriteIds.includes(album.id))
);

/**
 * Hook to get filtered and sorted albums based on Redux state
 * Uses memoized selector for optimized performance
 */
export function useFilteredAndSortedAlbums(): Album[] {
  return useSelector(selectFilteredAndSortedAlbums);
}

/**
 * Hook to get favorite albums from the store
 * Uses memoized selector for optimized performance
 */
export function useFavoriteAlbums(): Album[] {
  return useSelector(selectFavoriteAlbums);
}

/**
 * Hook to check if an album is favorited
 */
export function useIsFavorite(albumId: string): boolean {
  const favoriteIds = useSelector(selectFavoriteIds);
  return favoriteIds.includes(albumId);
}

/**
 * Hook to get current theme from Redux state
 */
export function useTheme() {
  return useSelector(selectTheme);
}

/**
 * Hook to get search query from Redux state
 */
export function useSearchQuery(): string {
  return useSelector(selectSearchQuery);
}

/**
 * Hook to get sort preference from Redux state
 */
export function useSortBy() {
  return useSelector(selectSortBy);
}
