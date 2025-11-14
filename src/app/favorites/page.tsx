"use client";

import { AlbumGrid } from "@/components/AlbumGrid";
import BackButton from "@/components/BackButton";
import { fetchTopAlbums } from "@/lib/api";
import { getFavorites } from "@/lib/storage";
import type { RootState } from "@/store";
import { setAlbums } from "@/store/slices/albumsSlice";
import { initializeFavorites } from "@/store/slices/favoritesSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const albums = useSelector((state: RootState) => state.albums.entities);

  // Load favorites and albums on mount
  useEffect(() => {
    let isMounted = true;

    (async () => {
      // Get stored favorites from localStorage
      const stored = getFavorites();

      // Initialize Redux with localStorage favorites if Redux is empty
      if (stored.length > 0 && favoriteIds.length === 0) {
        dispatch(initializeFavorites(stored));
      }

      // Fetch albums if we have favorites but no albums loaded
      if (albums.length === 0 && stored.length > 0) {
        try {
          const fetchedAlbums = await fetchTopAlbums();
          if (isMounted) {
            dispatch(setAlbums(fetchedAlbums));
          }
        } catch (error) {
          console.error("Failed to fetch albums:", error);
        }
      }

      // Mark hydration complete
      if (isMounted) {
        setIsHydrated(true);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [dispatch, favoriteIds.length, albums.length]);

  // Use Redux favorites if available, otherwise use stored favorites
  const effectiveFavoriteIds = favoriteIds;

  const favoritesArray = useMemo(() => {
    return albums.filter((album) => effectiveFavoriteIds.includes(album.id));
  }, [albums, effectiveFavoriteIds]);

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
