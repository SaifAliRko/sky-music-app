
//  iTunes API Response Types

// RSS Feed response from iTunes
export interface ITunesRSSResponse {
  feed: {
    entry: ITunesRSSEntry[];
    updated?: {
      label?: string;
    };
    title?: {
      label?: string;
    };
  };
}

// Individual album entry from RSS
export interface ITunesRSSEntry {
  'im:name': {
    label: string;
  };
  'im:artist': {
    label: string;
  };
  'im:image': Array<{
    label: string;
    attributes?: {
      height: string;
    };
  }>;
  'im:price': {
    label: string;
    attributes?: {
      amount: string;
      currency: string;
    };
  };
  'im:contentType': {
    'im:contentGenre': {
      attributes: {
        term: string;
        label: string;
      };
    };
  };
  link?: {
    attributes?: {
      href: string;
    };
  };
  id: {
    attributes: {
      'im:id': string;
    };
  };
}

// Album entity (normalized from RSS)
export interface Album {
  id: string;
  name: string;
  artist: string;
  image: string;
  price: string;
  genre: string;
  url?: string;
  releaseDate?: string;
}

// iTunes Lookup response for album details
export interface ITunesLookupResponse {
  resultCount: number;
  results: ITunesAlbumDetail[];
}

export interface ITunesAlbumDetail {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  artworkUrl600?: string;
  collectionPrice: number;
  currency: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCount: number;
}

// Lookup result for tracks
export interface ITunesTrackLookupResponse {
  resultCount: number;
  results: (ITunesAlbumDetail | ITunesTrack)[];
}

export interface ITunesTrack {
  trackId: number;
  trackName: string;
  trackNumber: number;
  trackTimeMillis: number;
  previewUrl?: string;
  artworkUrl100?: string;
}