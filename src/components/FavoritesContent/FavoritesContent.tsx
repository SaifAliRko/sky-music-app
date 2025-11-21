'use client';

import {
    BackLink,
    EmptyIcon,
    EmptyState,
    EmptyText
} from '@/app/favorites/page.styles';
import { AlbumGrid } from '@/components/AlbumGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { Album } from '@/lib/itunes.types';

interface FavoritesContentProps {
  hasLoaded: boolean;
  favoritesArray: Album[];
  favoriteCount: number;
}

/**
 * FavoritesContent component
 * Displays either loading spinner, empty state, or grid of favorite albums
 */
export function FavoritesContent({ hasLoaded, favoritesArray, favoriteCount }: FavoritesContentProps) {
  // Show loading while fetching albums
  if (!hasLoaded) {
    return <LoadingSpinner />;
  }

  // Show empty state if no favorites
  if (favoriteCount === 0) {
    return (
      <EmptyState>
        <EmptyIcon>💔</EmptyIcon>
        <EmptyText>
          No favorites yet! Start adding albums to your favorites by clicking the heart icon on any album.
        </EmptyText>
        <BackLink href="/albums">Browse Albums</BackLink>
      </EmptyState>
    );
  }

  // Show grid of favorite albums
  return <AlbumGrid albums={favoritesArray} />;
}
