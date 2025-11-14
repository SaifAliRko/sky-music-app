/**
 * Custom React hooks for the Sky Music application
 */

import type { Album } from '@/lib/itunes.types';
import type { RootState } from '@/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { filterAndSortAlbums } from '@/utils/search';

/**
 * Hook to get filtered and sorted albums based on Redux state
 */
export function useFilteredAndSortedAlbums(): Album[] {
  const { entities: albums } = useSelector((state: RootState) => state.albums);
  const { searchQuery, sortBy, filterGenre } = useSelector(
    (state: RootState) => state.ui
  );

  return useMemo(() => {
    return filterAndSortAlbums(albums, searchQuery, sortBy);
  }, [albums, searchQuery, sortBy]);
}

/**
 * Hook to get favorite albums from the store
 */
export function useFavoriteAlbums(): Album[] {
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const albums = useSelector((state: RootState) => state.albums.entities);

  return useMemo(() => {
    return albums.filter((album) => favoriteIds.includes(album.id));
  }, [albums, favoriteIds]);
}

/**
 * Hook to check if an album is favorited
 */
export function useIsFavorite(albumId: string): boolean {
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  return favoriteIds.includes(albumId);
}

/**
 * Hook to get current theme from Redux state
 */
export function useTheme() {
  return useSelector((state: RootState) => state.ui.theme);
}

/**
 * Hook to get search query from Redux state
 */
export function useSearchQuery(): string {
  return useSelector((state: RootState) => state.ui.searchQuery);
}

/**
 * Hook to get sort preference from Redux state
 */
export function useSortBy() {
  return useSelector((state: RootState) => state.ui.sortBy);
}
