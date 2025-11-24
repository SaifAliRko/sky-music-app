/**
 * Search and filter utilities for albums
 */

import type { Album } from '@/lib/itunes.types';

/** Filter albums by search query (name or artist) */
export const filterBySearchQuery = (
  albums: Album[],
  searchQuery: string
): Album[] => {
  if (!searchQuery.trim()) return albums;
  const query = searchQuery.toLowerCase();
  return albums.filter(
    (album) =>
      album.name.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query)
  );
};


/** Sort albums by specified criteria */
export const sortAlbums = (
  albums: Album[],
  sortBy: 'name' | 'artist' | 'genre'
): Album[] => {
  const sorted = [...albums];
  const compareFns = {
    artist: (a: Album, b: Album) => a.artist.localeCompare(b.artist),
    genre: (a: Album, b: Album) => a.genre.localeCompare(b.genre),
    name: (a: Album, b: Album) => a.name.localeCompare(b.name),
  };
  return sorted.sort(compareFns[sortBy]);
};

/** Apply all filters and sort to albums */
export const filterAndSortAlbums = (
  albums: Album[],
  searchQuery: string,
  sortBy: 'name' | 'artist' | 'genre'
): Album[] => sortAlbums(filterBySearchQuery(albums, searchQuery), sortBy);
