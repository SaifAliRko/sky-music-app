'use client';

import type { RootState } from '@/store';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './FavoritesToggle.styles';

interface FavoritesToggleProps {
  albumId: string;
  showLabel?: boolean;
}

export function FavoritesToggle({
  albumId,
  showLabel = true,
}: FavoritesToggleProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.ids);
  const isFavorite = favorites.includes(albumId);

  const handleClick = () => {
    dispatch(toggleFavorite(albumId));
  };

  return (
    <Button onClick={handleClick} title="Toggle favorite">
      {isFavorite ? '❤️' : '🤍'} {showLabel && (isFavorite ? 'Favorited' : 'Add to Favorites')}
    </Button>
  );
}
