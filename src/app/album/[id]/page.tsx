"use client";

import { HeaderButton } from "@/app/favorites/favorites.styles";
import { FavoritesToggle } from "@/components/FavoritesToggle";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { lookupAlbumTracks } from "@/lib/api";
import type { ITunesTrack } from "@/lib/itunes.types";
import { formatDuration } from "@/lib/parse";
import type { RootState } from "@/store";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: ${(props) => props.theme.spacing.xxl};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  font-size: ${(props) => props.theme.typography.fontSize.base};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  transition: all 0.3s ease-in-out;

  &:hover {
    text-decoration: underline;
  }
`;

const AlbumHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.xxl};
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const AlbumImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  object-fit: cover;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const AlbumInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize.xxxl};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  background: linear-gradient(90deg, #ff6b00 0%, #ff1493 25%, #ff00ff 50%, #6200ff 75%, #0066ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Artist = styled.h2`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize.xxl};
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
`;

const Meta = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.lg};
  flex-wrap: wrap;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSize.base};
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const TracksSection = styled.section`
  margin-top: ${(props) => props.theme.spacing.xxl};
`;

const TracksTitle = styled.h3`
  font-size: ${(props) => props.theme.typography.fontSize.xxl};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.text};
`;

const TracksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`;

const TrackItem = styled.li`
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
`;

const TrackHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const TrackNumber = styled.span`
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.primary};
  min-width: 30px;
`;

const TrackName = styled.span`
  flex: 1;
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.text};
`;

const TrackDuration = styled.span`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  color: ${(props) => props.theme.colors.textSecondary};
`;

const ErrorWrapper = styled.div`
  padding: ${(props) => props.theme.spacing.xxl};
  background-color: ${(props) => `${props.theme.colors.error}10`};
  color: ${(props) => props.theme.colors.error};
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

export default function AlbumDetailPage() {
  const router = useRouter();
  const params = useParams();
  const albumId = params.id as string;

  const [tracks, setTracks] = useState<ITunesTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const album = useSelector((state: RootState) =>
    state.albums.entities.find((a) => a.id === albumId)
  );

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const result = await lookupAlbumTracks(albumId);
        setTracks(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tracks");
      } finally {
        setLoading(false);
      }
    };

    if (albumId) {
      fetchTracks();
    }
  }, [albumId]);

  if (!album) {
    return (
      <PageWrapper>
        <Header />
        <MainContent>
          <HeaderButton href="/albums" title="Back to Albums">
            <Image src="/return-button.png" alt="Back" width={30} height={30} />
            Back to Albums
          </HeaderButton>
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
        <div style={{display: "flex", justifyContent: "flex-end", marginBottom: "20px"}}>
          <HeaderButton href="/albums" title="Back to Albums">
            <Image src="/return-button.png" alt="Back" width={30} height={30} />
            Back to Albums
          </HeaderButton>
        </div>
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
