"use client";

import { AlbumGrid } from "@/components/AlbumGrid";
import BackButton from "@/components/BackButton";
import { fetchTopAlbums } from "@/lib/api";
import { getFavorites } from "@/lib/storage";
import type { RootState } from "@/store";
import { setAlbums } from "@/store/slices/albumsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  BackLink,
  Count,
  EmptyIcon,
  EmptyState,
  EmptyText,
  FavoritesHeader,
  FavoritesWrapper,
  HeaderLeft,
  Title
} from "./favorites.styles";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const [storedFavoriteIds, setStoredFavoriteIds] = useState<string[]>([]);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(false);

  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const albums = useSelector((state: RootState) => state.albums.entities);

  // Load favorites from localStorage and fetch albums if needed
  useEffect(() => {
    const loadFavoritesAndAlbums = async () => {
      // Load stored favorite IDs
      const stored = getFavorites();
      setStoredFavoriteIds(stored);

      // If albums are empty but we have favorites to display, fetch them
      if (albums.length === 0 && stored.length > 0) {
        setIsLoadingAlbums(true);
        try {
          const fetchedAlbums = await fetchTopAlbums();
          dispatch(setAlbums(fetchedAlbums));
        } catch (error) {
          console.error("Failed to fetch albums:", error);
        } finally {
          setIsLoadingAlbums(false);
        }
      }
    };

    loadFavoritesAndAlbums();
  }, [albums.length, dispatch]);

  // Use Redux favorites if available, otherwise use stored favorites
  const effectiveFavoriteIds = favoriteIds.length > 0 ? favoriteIds : storedFavoriteIds;

  const favoritesArray = useMemo(() => {
    return albums.filter((album) => effectiveFavoriteIds.includes(album.id));
  }, [albums, effectiveFavoriteIds]);

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
