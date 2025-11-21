"use client";

import { AlbumContent } from "@/components/AlbumContent";
import { BackToAlbumsButton } from "@/components/BackToAlbumsButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useAlbumDetail } from "@/hooks/useAlbumDetail";
import { useParams } from "next/navigation";
import {
  HeaderButtonContainer,
  MainContent,
  PageWrapper,
} from "./page.styles";

export default function AlbumDetailPage() {
  const params = useParams();
  const albumId = params.id as string;

  const { album, albumsLoaded, tracks, tracksLoading, error } =
    useAlbumDetail(albumId);

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <HeaderButtonContainer>
          <BackToAlbumsButton />
        </HeaderButtonContainer>
        <AlbumContent
          album={album}
          albumId={albumId}
          tracks={tracks}
          tracksLoading={tracksLoading}
          error={error}
          albumsLoaded={albumsLoaded}
        />
      </MainContent>
      <Footer />
    </PageWrapper>
  );
}
