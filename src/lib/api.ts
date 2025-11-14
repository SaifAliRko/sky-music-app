import type { ITunesTrack } from './itunes.types';
import {
  Album,
  ITunesAlbumDetail,
  ITunesRSSResponse,
  ITunesTrackLookupResponse,
} from './itunes.types';
import { parseRSSFeed, parseTrackLookupResponse } from './parse';

const ITUNES_API_BASE = 'https://itunes.apple.com';
const RSS_FEED_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

/**
 * Fetch top 100 albums from iTunes RSS feed
 * Server-side function - directly calls iTunes API
 */
function fetchTopAlbumsFromItunes(): Promise<Album[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(RSS_FEED_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch albums: ${response.statusText}`);
      }

      const data: ITunesRSSResponse = await response.json();
      resolve(parseRSSFeed(data));
    } catch (error) {
      console.error('Error fetching top albums:', error);
      reject(error);
    }
  });
}

/**
 * Fetch top 100 albums - calls API endpoint (for client-side use)
 * Or directly fetches from iTunes (for server-side use)
 */
export async function fetchTopAlbums(): Promise<Album[]> {
  // If running on client (window exists), call API endpoint
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/albums');

      if (!response.ok) {
        throw new Error(`Failed to fetch albums: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching albums from API:', error);
      throw error;
    }
  }

  // Server-side: call iTunes directly
  return fetchTopAlbumsFromItunes();
}

/**
 * Lookup album details and tracks by collection ID
 * Returns both album info and track list
 */
export async function lookupAlbumTracks(
  collectionId: string
): Promise<ITunesTrack[]> {
  try {
    const url = `${ITUNES_API_BASE}/lookup?id=${collectionId}&entity=song`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to lookup tracks: ${response.statusText}`);
    }

    const data: ITunesTrackLookupResponse = await response.json();
    return parseTrackLookupResponse(data);
  } catch (error) {
    console.error('Error looking up album tracks:', error);
    throw error;
  }
}

/**
 * Fetch album details and tracks by collection ID
 * Calls the Next.js API route which proxies to iTunes API
 */
export async function fetchAlbumDetails(albumId: string): Promise<ITunesTrackLookupResponse> {
  try {
    const response = await fetch(`/api/albums/${albumId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch album details: ${response.statusText}`);
    }

    const data: ITunesTrackLookupResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching album details:', error);
    throw error;
  }
}

/**
 * Get album details from lookup response
 * Extracts album info from the first result in the lookup response
 */
export function getAlbumFromLookup(data: ITunesTrackLookupResponse): Album | null {
  if (!data?.results || data.results.length === 0) {
    return null;
  }

  const albumResult = data.results[0];
  
  // Type guard: check if it has album-specific fields (not a track)
  if ('collectionName' in albumResult && 'artistName' in albumResult && 'collectionId' in albumResult) {
    const albumDetail = albumResult as ITunesAlbumDetail;
    
    // Ensure required properties exist
    if (!albumDetail.collectionName || !albumDetail.artistName) {
      return null;
    }

    try {
      const result: Album = {
        id: String(albumDetail.collectionId),
        name: albumDetail.collectionName,
        artist: albumDetail.artistName,
        image: albumDetail.artworkUrl600 || albumDetail.artworkUrl100 || '',
        genre: albumDetail.primaryGenreName || 'Unknown',
        releaseDate: albumDetail.releaseDate ? new Date(albumDetail.releaseDate).toLocaleDateString() : '',
        price: albumDetail.collectionPrice ? `$${Number(albumDetail.collectionPrice).toFixed(2)}` : '$0.00',
      };
      
      return result;
    } catch (error) {
      console.error('[getAlbumFromLookup] Error parsing album:', error);
      return null;
    }
  }

  return null;
}