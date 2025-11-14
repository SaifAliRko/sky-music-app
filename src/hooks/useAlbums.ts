/**
 * Custom React hooks for the Sky Music application
 */

import type { Album } from '@/lib/itunes.types';
import { selectFavoriteAlbums, selectFavoriteIds, selectFilteredAndSortedAlbums, selectSearchQuery, selectSortBy, selectTheme } from '@/store/selectors';
import { useSelector } from 'react-redux';

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
