import type { Album } from '@/lib/itunes.types';
import type { RootState } from '@/store';
import { filterAndSortAlbums } from '@/utils/search';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

// Base selectors
const selectAlbums = (state: RootState) => state.albums.entities;
const selectFavoriteIds = (state: RootState) => state.favorites.ids;
const selectSearchQuery = (state: RootState) => state.ui.searchQuery;
const selectSortBy = (state: RootState) => state.ui.sortBy;
const selectTheme = (state: RootState) => state.ui.theme;

// Memoized composite selectors
const selectFilteredAndSortedAlbums = createSelector(
  [selectAlbums, selectSearchQuery, selectSortBy],
  (albums, searchQuery, sortBy) => filterAndSortAlbums(albums, searchQuery, sortBy)
);

const selectFavoriteAlbums = createSelector(
  [selectAlbums, selectFavoriteIds],
  (albums, favoriteIds) => albums.filter((album) => favoriteIds.includes(album.id))
);

const selectIsFavorite = (albumId: string) =>
  createSelector([selectFavoriteIds], (ids) => ids.includes(albumId));

// Hooks
export const useFilteredAndSortedAlbums = (): Album[] =>
  useSelector(selectFilteredAndSortedAlbums);

export const useFavoriteAlbums = (): Album[] =>
  useSelector(selectFavoriteAlbums);

export const useIsFavorite = (albumId: string): boolean =>
  useSelector(selectIsFavorite(albumId));

export const useTheme = () =>
  useSelector(selectTheme);

export const useSearchQuery = (): string =>
  useSelector(selectSearchQuery);

export const useSortBy = () =>
  useSelector(selectSortBy);
