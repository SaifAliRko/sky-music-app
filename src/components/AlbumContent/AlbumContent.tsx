import { FavoritesToggle } from "@/components/FavoritesToggle";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { Album, ITunesTrack } from "@/lib/itunes.types";
import { formatDuration } from "@/lib/parse";
import {
    AlbumHeader,
    AlbumImage,
    AlbumInfo,
    Artist,
    ErrorWrapper,
    Meta,
    MetaItem,
    Title,
    TrackDuration,
    TrackHeader,
    TrackItem,
    TrackName,
    TrackNumber,
    TracksList,
    TracksSection,
    TracksTitle,
} from "./AlbumContent.styles";

interface AlbumContentProps {
  album?: Album;
  albumId: string;
  tracks: ITunesTrack[];
  tracksLoading: boolean;
  error: string | null;
  albumsLoaded: boolean;
}

export function AlbumContent({
  album,
  albumId,
  tracks,
  tracksLoading,
  error,
  albumsLoaded,
}: AlbumContentProps) {
  // Loading state - waiting for albums
  if (!albumsLoaded) {
    return <LoadingSpinner />;
  }

  // Error state - album not found
  if (!album) {
    return <ErrorWrapper>Album not found</ErrorWrapper>;
  }

  return (
    <>
      <AlbumHeader>
        <AlbumImage src={album.image} alt={album.name} />
        <AlbumInfo>
          <Title>{album.name}</Title>
          <Artist>{album.artist}</Artist>
          <Meta>
            <MetaItem>🎵 Genre: {album.genre}</MetaItem>
            <MetaItem>💰 {album.price}</MetaItem>
          </Meta>
          <FavoritesToggle albumId={albumId} showLabel={true} />
        </AlbumInfo>
      </AlbumHeader>

      <TracksSection>
        <TracksTitle>
          Tracks {tracks.length > 0 && `(${tracks.length})`}
        </TracksTitle>

        {tracksLoading ? (
          <LoadingSpinner />
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
    </>
  );
}
