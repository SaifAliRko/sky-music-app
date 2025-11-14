"use client";

import {
  AlbumHeader,
  AlbumImage,
  AlbumInfo,
  Artist,
  ErrorWrapper,
  HeaderButtonContainer,
  LoadingWrapper,
  MainContent,
  Meta,
  MetaItem,
  PageWrapper,
  Title,
  TrackDuration,
  TrackHeader,
  TrackItem,
  TrackName,
  TrackNumber,
  TracksList,
  TracksSection,
  TracksTitle,
} from "@/components/AlbumDetail.styles";
import { BackToAlbumsButton } from "@/components/BackToAlbumsButton";
import { FavoritesToggle } from "@/components/FavoritesToggle";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { formatDuration } from "@/lib/parse";
import type { AppDispatch, RootState } from "@/store";
import { fetchAlbumTracks } from "@/store/slices/albumDetailsSlice";
import { fetchAlbums } from "@/store/slices/albumsSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AlbumDetailPage() {
  const params = useParams();
  const albumId = params.id as string;
  const dispatch = useDispatch<AppDispatch>();

  const album = useSelector((state: RootState) =>
    state.albums.entities.find((a) => a.id === albumId)
  );

  const { hasLoaded: albumsLoaded, loading: albumsLoading } = useSelector(
    (state: RootState) => state.albums
  );

  const { tracks, loading, error } = useSelector((state: RootState) => state.albumDetails);

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

  // Show loading while fetching albums
  if (!albumsLoaded) {
    return (
      <PageWrapper>
        <Header />
        <MainContent>
          <HeaderButtonContainer>
            <BackToAlbumsButton />
          </HeaderButtonContainer>
          <LoadingWrapper>Loading album...</LoadingWrapper>
        </MainContent>
        <Footer />
      </PageWrapper>
    );
  }

  // Show error if album not found after loading
  if (!album) {
    return (
      <PageWrapper>
        <Header />
        <MainContent>
          <HeaderButtonContainer>
            <BackToAlbumsButton />
          </HeaderButtonContainer>
          <ErrorWrapper>Album not found</ErrorWrapper>
        </MainContent>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <HeaderButtonContainer>
          <BackToAlbumsButton />
        </HeaderButtonContainer>
        <AlbumHeader>
          <AlbumImage src={album.image} alt={album.name} />
          <AlbumInfo>
            <Title>{album.name}</Title>
            <Artist>{album.artist}</Artist>
            <Meta>
              <MetaItem>🎵 Genre: {album.genre}</MetaItem>
              <MetaItem>💰 {album.price}</MetaItem>
            </Meta>
            <div>
              <FavoritesToggle albumId={albumId} showLabel={true} />
            </div>
          </AlbumInfo>
        </AlbumHeader>

        <TracksSection>
          <TracksTitle>
            Tracks {tracks.length > 0 && `(${tracks.length})`}
          </TracksTitle>

          {loading ? (
            <LoadingWrapper>Loading tracks... 🎵</LoadingWrapper>
          ) : error ? (
            <ErrorWrapper>Failed to load tracks: {error}</ErrorWrapper>
          ) : tracks.length > 0 ? (
            <TracksList>
              {tracks.map((track) => (
                <TrackItem key={track.trackId}>
                  <TrackHeader>
                    <TrackNumber>#{track.trackNumber}</TrackNumber>
                    <TrackName>{track.trackName}</TrackName>
                    <TrackDuration>
                      {formatDuration(track.trackTimeMillis)}
                    </TrackDuration>
                  </TrackHeader>
                </TrackItem>
              ))}
            </TracksList>
          ) : (
            <ErrorWrapper>No tracks available for this album</ErrorWrapper>
          )}
        </TracksSection>
      </MainContent>
      <Footer />
    </PageWrapper>
  );
}
