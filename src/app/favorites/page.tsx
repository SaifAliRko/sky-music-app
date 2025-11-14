"use client";

import { AlbumGrid } from "@/components/AlbumGrid";
import BackButton from "@/components/BackButton";
import { useFavoritesHydration } from "@/hooks/useFavoritesHydration";
import { useMemo } from "react";
import {
  BackLink,
  Count,
  EmptyIcon,
  EmptyState,
  EmptyText,
  FavoritesHeader,
  FavoritesWrapper,
  HeaderLeft,
  Title,
} from "./favorites.styles";

export default function FavoritesPage() {
  const { isHydrated, albums, favoriteIds } = useFavoritesHydration();

  const favoritesArray = useMemo(() => {
    return albums.filter((album) => favoriteIds.includes(album.id));
  }, [albums, favoriteIds]);

  // Don't render until hydration is complete
  if (!isHydrated) {
    return null;
  }

  return (
    <FavoritesWrapper>
      <FavoritesHeader>
        <HeaderLeft>
          <Title>
            ❤️ My Favorites
            {favoritesArray.length > 0 && (
              <Count>({favoritesArray.length})</Count>
            )}
          </Title>
        </HeaderLeft>
        <BackButton />
      </FavoritesHeader>

      {favoritesArray.length === 0 ? (
        <EmptyState>
          <EmptyIcon>💔</EmptyIcon>
          <EmptyText>
            No favorites yet! Start adding albums to your favorites by clicking
            the heart icon on any album.
          </EmptyText>
          <BackLink href="/albums">Browse Albums</BackLink>
        </EmptyState>
      ) : (
        <AlbumGrid albums={favoritesArray} />
      )}
    </FavoritesWrapper>
  );
}
