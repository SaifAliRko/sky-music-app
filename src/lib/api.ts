import type { ITunesTrack } from './itunes.types';
import {
  Album,
  ITunesRSSResponse,
  ITunesTrackLookupResponse
} from './itunes.types';
import { parseRSSFeed, parseTrackLookupResponse } from './parse';

const ITUNES_API_BASE = 'https://itunes.apple.com';
const RSS_FEED_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

/**
 * Fetch top 100 albums from iTunes RSS feed
 * Used by /api/albums route for server-side fetching
 */
export async function fetchTopAlbums(): Promise<Album[]> {
  try {
    const response = await fetch(RSS_FEED_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.statusText}`);
    }

    const data: ITunesRSSResponse = await response.json();
    return parseRSSFeed(data);
  } catch (error) {
    console.error('Error fetching albums from iTunes:', error);
    throw error;
  }
}

/**
 * Fetch album details and tracks by collection ID
 * Returns both album info and track list
 */
export async function fetchAlbumDetails(
  collectionId: string
): Promise<ITunesTrack[]> {
  try {
    const url = `${ITUNES_API_BASE}/lookup?id=${collectionId}&entity=song`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch album details: ${response.statusText}`);
    }

    const data: ITunesTrackLookupResponse = await response.json();
    return parseTrackLookupResponse(data);
  } catch (error) {
    console.error('Error fetching album details:', error);
    throw error;
  }
}

