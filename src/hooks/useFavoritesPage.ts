import type { RootState } from '@/store';
import { fetchAlbums } from '@/store/slices/albumsSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFetchOnMount } from './useFetchOnMount';

/**
 * Custom hook to manage favorites page state
 * Handles fetching albums and filtering by favorites
 */
export const useFavoritesPage = () => {
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const { entities: albums, hasLoaded } = useSelector((state: RootState) => state.albums);

  useFetchOnMount(hasLoaded, fetchAlbums);

  const favoritesArray = useMemo(
    () => albums.filter((album) => favoriteIds.includes(album.id)),
    [albums, favoriteIds]
  );

  return {
    hasLoaded,
    favoritesArray,
    favoriteCount: favoritesArray.length,
  };
};
