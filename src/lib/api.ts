import type { ITunesTrack } from './itunes.types';
import {
  Album,
  ITunesRSSResponse,
  ITunesTrackLookupResponse
} from './itunes.types';
import { parseRSSFeed, parseTrackLookupResponse } from './parse';

const ITUNES_API_BASE = 'https://itunes.apple.com';
const RSS_FEED_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

const fetchJson = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const fetchTopAlbums = async (): Promise<Album[]> =>
  parseRSSFeed(await fetchJson<ITunesRSSResponse>(RSS_FEED_URL));

export const fetchAlbumDetails = async (collectionId: string): Promise<ITunesTrack[]> =>
  parseTrackLookupResponse(
    await fetchJson<ITunesTrackLookupResponse>(
      `${ITUNES_API_BASE}/lookup?id=${collectionId}&entity=song`
    )
  );


