import { fetchTopAlbums } from '@/lib/api';
import { getFavorites } from '@/lib/storage';
import type { RootState } from '@/store';
import { setAlbums } from '@/store/slices/albumsSlice';
import { initializeFavorites } from '@/store/slices/favoritesSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Custom hook to handle hydration of favorites from localStorage
 * and loading albums if needed
 */
export function useFavoritesHydration() {
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const albums = useSelector((state: RootState) => state.albums.entities);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      // Get stored favorites from localStorage
      const stored = getFavorites();

      // Initialize Redux with localStorage favorites if Redux is empty
      if (stored.length > 0 && favoriteIds.length === 0) {
        dispatch(initializeFavorites(stored));
      }

      // Fetch albums if we have favorites but no albums loaded
      if (albums.length === 0 && stored.length > 0) {
        try {
          const fetchedAlbums = await fetchTopAlbums();
          if (isMounted) {
            dispatch(setAlbums(fetchedAlbums));
          }
        } catch (error) {
          console.error('Failed to fetch albums:', error);
        }
      }

      // Mark hydration complete
      if (isMounted) {
        setIsHydrated(true);
      }
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount to avoid infinite loops

  return { isHydrated, albums, favoriteIds };
}
