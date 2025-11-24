import {
  Album,
  ITunesRSSEntry,
  ITunesRSSResponse,
  ITunesTrack,
  ITunesTrackLookupResponse,
} from './itunes.types';


/** Normalize RSS feed entry to Album model */
export const normalizeRSSEntry = (entry: ITunesRSSEntry): Album => {
  const images = entry['im:image'] ?? [];
  const image = (images[images.length - 1] ?? images[0])?.label ?? '';
  const price = entry['im:price']?.attributes?.amount ?? entry['im:price']?.label ?? '0';

  return {
    id: entry.id?.attributes?.['im:id'] ?? '',
    name: entry['im:name']?.label ?? 'Unknown Album',
    artist: entry['im:artist']?.label ?? 'Unknown Artist',
    image,
    price: `$${parseFloat(price).toFixed(2)}`,
    genre: entry['im:contentType']?.['im:contentGenre']?.attributes?.label ?? 'Music',
    url: entry.link?.attributes?.href ?? '',
  };
}

/** Parse RSS feed response into Album array */
export const parseRSSFeed = (response: ITunesRSSResponse): Album[] =>
  Array.isArray(response?.feed?.entry) ? response.feed.entry.map(normalizeRSSEntry) : [];


/** Parse track lookup response into Track array */
export const parseTrackLookupResponse = (
  response: ITunesTrackLookupResponse
): ITunesTrack[] =>
  Array.isArray(response?.results)
    ? response.results
        .slice(1)
        .filter((result): result is ITunesTrack => 'trackId' in result)
        .map(({ trackId, trackName, trackNumber, trackTimeMillis, previewUrl }) => ({
          trackId,
          trackName,
          trackNumber,
          trackTimeMillis,
          previewUrl,
        }))
    : [];

/** Format milliseconds to MM:SS format */
export const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};