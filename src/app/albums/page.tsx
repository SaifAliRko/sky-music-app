'use client';

import { AlbumsContent } from '@/components/AlbumsContent';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useAlbumsPage } from '@/hooks/useAlbumsPage';
import { MainContent, PageWrapper } from './page.styles';

export default function AlbumsPage() {
  const { hasLoaded, error } = useAlbumsPage();

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <AlbumsContent hasLoaded={hasLoaded} error={error} />
      </MainContent>
      <Footer />
    </PageWrapper>
  );
}