import {
  Album,
  ITunesRSSResponse,
  ITunesTrack,
  ITunesTrackLookupResponse,
} from "./itunes.types";
import { parseRSSFeed, parseTrackLookupResponse } from "./parse";

const ITUNES_API_BASE = "https://itunes.apple.com";
const RSS_FEED_URL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";

// Fetch top 100 albums from iTunes RSS feed

export async function fetchTopAlbums(): Promise<Album[]> {
  try {
    const response = await fetch(RSS_FEED_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.statusText}`);
    }

    const data: ITunesRSSResponse = await response.json();
    return parseRSSFeed(data);
  } catch (error) {
    console.error("Error fetching top albums:", error);
    throw error;
  }
}

 // Lookup album details and tracks by collection ID
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
    console.error("Error looking up album tracks:", error);
    throw error;
  }
}
