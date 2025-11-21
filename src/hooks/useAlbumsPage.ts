import type { AppDispatch, RootState } from "@/store";
import { fetchAlbums } from "@/store/slices/albumsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Custom hook for albums page logic
 * Handles fetching albums and returning loading/error states
 */
export function useAlbumsPage() {
  const dispatch = useDispatch<AppDispatch>();
  
  const { loading, error, hasLoaded } = useSelector(
    (state: RootState) => state.albums
  );

  useEffect(() => {
    if (!hasLoaded && !loading) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, hasLoaded, loading]);

  return {
    loading,
    error,
    hasLoaded,
  };
}
