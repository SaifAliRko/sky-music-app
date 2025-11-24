import type { AppDispatch, RootState } from "@/store";
import { fetchAlbumTracks } from "@/store/slices/albumDetailsSlice";
import { fetchAlbums } from "@/store/slices/albumsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchOnMount } from "./useFetchOnMount";

export function useAlbumDetail(albumId: string) {
  const dispatch = useDispatch<AppDispatch>();

  const album = useSelector((state: RootState) =>
    state.albums.entities.find((a) => a.id === albumId)
  );

  const { hasLoaded: albumsLoaded } = useSelector(
    (state: RootState) => state.albums
  );

  const {
    tracks,
    loading: tracksLoading,
    error,
  } = useSelector((state: RootState) => state.albumDetails);

  useFetchOnMount(albumsLoaded, fetchAlbums);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchAlbumTracks(albumId));
    }
  }, [dispatch, albumId]);

  return {
    album,
    tracks,
    tracksLoading,
    error,
  };
}
