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
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
`;

const ErrorWrapper = styled.div`
  padding: ${(props) => props.theme.spacing.xxl};
  background-color: ${(props) => `${props.theme.colors.error}10`};
  color: ${(props) => props.theme.colors.error};
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  margin: ${(props) => props.theme.spacing.lg};
`;

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