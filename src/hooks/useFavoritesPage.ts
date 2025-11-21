import type { AppDispatch, RootState } from '@/store';
import { fetchAlbums } from '@/store/slices/albumsSlice';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Custom hook to manage favorites page state
 * Handles fetching albums and filtering by favorites
 */
export function useFavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const { entities: albums, hasLoaded, loading, error } = useSelector((state: RootState) => state.albums);

  // Fetch albums if not loaded yet
  useEffect(() => {
    if (!hasLoaded && !loading) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, hasLoaded, loading]);

  // Filter albums by favorites
  const favoritesArray = useMemo(() => {
    return albums.filter((album) => favoriteIds.includes(album.id));
  }, [albums, favoriteIds]);

  return {
    hasLoaded,
    loading,
    error,
    favoritesArray,
    favoriteCount: favoritesArray.length,
  };
}
