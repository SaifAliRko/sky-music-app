'use client';

import { AlbumGrid } from '@/components/AlbumGrid';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LoadingSkeletons } from '@/components/LoadingSkeletons';
import { SearchBar } from '@/components/SearchBar';
import { SortBar } from '@/components/SortBar';
import type { AppDispatch, RootState } from '@/store';
import { fetchAlbums } from '@/store/slices/albumsSlice';
import { useEffect, useMemo } from 'react';
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
  const { entities: albums, loading, error, hasLoaded } = useSelector(
    (state: RootState) => state.albums
  );
  const { searchQuery, sortBy, filterGenre } = useSelector(
    (state: RootState) => state.ui
  );

  useEffect(() => {
    if (!hasLoaded && !loading) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, hasLoaded, loading]);

  // Filter and sort albums
  const filteredAlbums = useMemo(() => {
    let result = [...albums];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (album) =>
          album.name.toLowerCase().includes(query) ||
          album.artist.toLowerCase().includes(query)
      );
    }

    // Apply genre filter
    if (filterGenre && filterGenre !== 'All Genres') {
      result = result.filter((album) =>
        album.genre === filterGenre
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'genre':
          return a.genre.localeCompare(b.genre);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [albums, searchQuery, sortBy, filterGenre]);

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