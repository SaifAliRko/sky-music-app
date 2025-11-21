import { AlbumGrid } from "@/components/AlbumGrid";
import { LoadingSkeletons } from "@/components/LoadingSkeletons";
import { SearchBar } from "@/components/SearchBar";
import { SortBar } from "@/components/SortBar";
import { useFilteredAndSortedAlbums } from "@/hooks/useAlbums";
import { ErrorWrapper } from "./AlbumsContent.styles";

interface AlbumsContentProps {
  hasLoaded: boolean;
  error: string | null;
}

export function AlbumsContent({ hasLoaded, error }: AlbumsContentProps) {
  const filteredAlbums = useFilteredAndSortedAlbums();

  return (
    <>
      <SearchBar />
      <SortBar />
      {!hasLoaded ? (
        <LoadingSkeletons />
      ) : error ? (
        <ErrorWrapper>
          <p>Failed to load albums. Please try again later.</p>
          <p>{error}</p>
        </ErrorWrapper>
      ) : (
        <AlbumGrid albums={filteredAlbums} />
      )}
    </>
  );
}
