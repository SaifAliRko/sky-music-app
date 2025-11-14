/**
 * Search and filter utilities for albums
 */

import type { Album } from '@/lib/itunes.types';

/**
 * Filter albums by search query (name or artist)
 */
export function filterBySearchQuery(
  albums: Album[],
  searchQuery: string
): Album[] {
  if (!searchQuery.trim()) {
    return albums;
  }

  const query = searchQuery.toLowerCase();
  return albums.filter(
    (album) =>
      album.name.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query)
  );
}


/**
 * Sort albums by specified criteria
 */
export function sortAlbums(
  albums: Album[],
  sortBy: 'name' | 'artist' | 'genre'
): Album[] {
  const sorted = [...albums];

  switch (sortBy) {
    case 'artist':
      return sorted.sort((a, b) => a.artist.localeCompare(b.artist));
    case 'genre':
      return sorted.sort((a, b) => a.genre.localeCompare(b.genre));
    case 'name':
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

/**
 * Apply all filters and sort to albums
 */
export function filterAndSortAlbums(
  albums: Album[],
  searchQuery: string,
  sortBy: 'name' | 'artist' | 'genre',
): Album[] {
  let result = filterBySearchQuery(albums, searchQuery);
  result = sortAlbums(result, sortBy);
  return result;
}
