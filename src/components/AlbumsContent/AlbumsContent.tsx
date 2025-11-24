import { AlbumGrid } from '@/components/AlbumGrid';
import { LoadingSkeletons } from '@/components/LoadingSkeletons';
import { SearchBar } from '@/components/SearchBar';
import { SortBar } from '@/components/SortBar';
import { useFilteredAndSortedAlbums } from '@/hooks/useAlbums';
import { useFetchOnMount } from '@/hooks/useFetchOnMount';
import type { RootState } from '@/store';
import { fetchAlbums } from '@/store/slices/albumsSlice';
import { useSelector } from 'react-redux';
import { ErrorWrapper } from './AlbumsContent.styles';

export function AlbumsContent() {
  const { hasLoaded, error } = useSelector(
    (state: RootState) => state.albums
  );
  const filteredAlbums = useFilteredAndSortedAlbums();

  useFetchOnMount(hasLoaded, fetchAlbums);

  return (
    <>
      <SearchBar />
      <SortBar />
      {!hasLoaded ? (
        <LoadingSkeletons />
      ) : error ? (
        <ErrorWrapper>
          <p>Failed to load albums. Please try again later.</p>
          <p>{error}</p>
        </ErrorWrapper>
      ) : (
        <AlbumGrid albums={filteredAlbums} />
      )}
    </>
  );
}
