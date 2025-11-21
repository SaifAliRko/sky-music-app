import type { AppDispatch, RootState } from "@/store";
import { fetchAlbumTracks } from "@/store/slices/albumDetailsSlice";
import { fetchAlbums } from "@/store/slices/albumsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Custom hook for album detail page logic
 * Handles data fetching and state selection
 */
export function useAlbumDetail(albumId: string) {
  const dispatch = useDispatch<AppDispatch>();

  const album = useSelector((state: RootState) =>
    state.albums.entities.find((a) => a.id === albumId)
  );

  const { hasLoaded: albumsLoaded, loading: albumsLoading } = useSelector(
    (state: RootState) => state.albums
  );

  const {
    tracks,
    loading: tracksLoading,
    error,
  } = useSelector((state: RootState) => state.albumDetails);

  // Fetch albums list on mount if not loaded
  useEffect(() => {
    if (!albumsLoaded && !albumsLoading) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, albumsLoaded, albumsLoading]);

  // Fetch album tracks when albumId changes
  useEffect(() => {
    if (albumId) {
      dispatch(fetchAlbumTracks(albumId));
    }
  }, [dispatch, albumId]);

  return {
    album,
    albumsLoaded,
    tracks,
    tracksLoading,
    error,
  };
}
