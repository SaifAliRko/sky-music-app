import {
    Album,
    ITunesRSSEntry,
    ITunesRSSResponse,
    ITunesTrack,
    ITunesTrackLookupResponse,
} from './itunes.types';


//  Normalize RSS feed entry to Album model
export function normalizeRSSEntry(entry: ITunesRSSEntry): Album {
  const images = entry['im:image'] || [];
  // Get the highest resolution image
  const image = images[images.length - 1]?.label || images[0]?.label || '';

  const priceInfo = entry['im:price'] || {};
  const price = priceInfo.attributes?.amount || priceInfo.label || '0';

  const genre =
    entry['im:contentType']?.['im:contentGenre']?.attributes?.label || 'Music';

  const albumId = entry.id?.attributes?.['im:id'] || '';
  const linkUrl = entry.link?.attributes?.href || '';

  return {
    id: albumId,
    name: entry['im:name']?.label || 'Unknown Album',
    artist: entry['im:artist']?.label || 'Unknown Artist',
    image,
    price: `$${parseFloat(price).toFixed(2)}`,
    genre,
    url: linkUrl,
  };
}

//  Parse RSS feed response into Album array
export function parseRSSFeed(response: ITunesRSSResponse): Album[] {
  if (!response?.feed?.entry || !Array.isArray(response.feed.entry)) {
    return [];
  }

  return response.feed.entry.map(normalizeRSSEntry);
}


 //  Parse track lookup response into Track array
export function parseTrackLookupResponse(
  response: ITunesTrackLookupResponse
): ITunesTrack[] {
  if (!response?.results || !Array.isArray(response.results)) {
    return [];
  }

  return response.results
    .slice(1)
    .filter((result): result is ITunesTrack => 'trackId' in result)
    .map((track) => ({
      trackId: track.trackId,
      trackName: track.trackName,
      trackNumber: track.trackNumber,
      trackTimeMillis: track.trackTimeMillis,
      previewUrl: track.previewUrl,
    }));
}

/**
 * Format milliseconds to MM:SS format
 */
export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}