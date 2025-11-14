'use client';

import { AlbumGrid } from '@/components/AlbumGrid';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LoadingSkeletons } from '@/components/LoadingSkeletons';
import { SearchBar } from '@/components/SearchBar';
import { SortBar } from '@/components/SortBar';
import { useFilteredAndSortedAlbums } from '@/hooks/useAlbums';
import type { AppDispatch, RootState } from '@/store';
import { fetchAlbums } from '@/store/slices/albumsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorWrapper, MainContent, PageWrapper } from './styles/albums.styles';

export default function AlbumsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, hasLoaded } = useSelector(
    (state: RootState) => state.albums
  );

  useEffect(() => {
    if (!hasLoaded && !loading) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, hasLoaded, loading]);

  // Use custom hook for filtered and sorted albums
  const filteredAlbums = useFilteredAndSortedAlbums();

  return (
    <PageWrapper>
      <Header />
      <SearchBar />
      <SortBar />
      <MainContent>
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
      </MainContent>
      <Footer />
    </PageWrapper>
  );
}