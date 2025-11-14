"use client";

import { Album } from "@/lib/itunes.types";
import type { RootState } from "@/store";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Artist,
  CardWrapper,
  FavoriteButton,
  Genre,
  Image,
  ImageWrapper,
  Meta,
  Price,
  Title,
} from "./AlbumCard.styles";

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.ids);
  const isFavorite = favorites.includes(album.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(album.id));
  };

  return (
    <CardWrapper href={`/album/${album.id}`}>
      <ImageWrapper>
        <Image src={album.image} alt={album.name} loading="lazy" />
        <FavoriteButton onClick={handleFavoriteClick} title="Toggle favorite">
          {isFavorite ? "❤️" : "🤍"}
        </FavoriteButton>
      </ImageWrapper>
      <Title>{album.name}</Title>
      <Artist>{album.artist}</Artist>
      <Meta>
        <Genre>{album.genre}</Genre>
        <Price>{album.price}</Price>
      </Meta>
    </CardWrapper>
  );
}
