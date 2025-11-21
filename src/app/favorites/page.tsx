'use client';

import { BackToAlbumsButton } from '@/components/BackToAlbumsButton';
import { FavoritesContent } from '@/components/FavoritesContent';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useFavoritesPage } from '@/hooks/useFavoritesPage';
import {
  Count,
  FavoritesHeader,
  FavoritesWrapper,
  HeaderLeft,
  MainContent,
  Title,
} from './page.styles';

export default function FavoritesPage() {
  const { hasLoaded, favoritesArray, favoriteCount } = useFavoritesPage();

  return (
    <FavoritesWrapper>
      <Header />
      <MainContent>
        <FavoritesHeader>
          <HeaderLeft>
            <Title>
              ❤️ My Favorites
              {favoriteCount > 0 && <Count>({favoriteCount})</Count>}
            </Title>
          </HeaderLeft>
          <BackToAlbumsButton />
        </FavoritesHeader>
        <FavoritesContent
          hasLoaded={hasLoaded}
          favoritesArray={favoritesArray}
          favoriteCount={favoriteCount}
        />
      </MainContent>
      <Footer />
    </FavoritesWrapper>
  );
}
