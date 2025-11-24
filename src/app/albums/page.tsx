'use client';

import { AlbumsContent } from '@/components/AlbumsContent';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MainContent, PageWrapper } from './page.styles';

export default function AlbumsPage() {
  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <AlbumsContent />
      </MainContent>
      <Footer />
    </PageWrapper>
  );
}