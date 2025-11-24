import { Album } from '@/lib/itunes.types';
import { AlbumCard } from '../AlbumCard';
import { EmptyState, GridWrapper } from './AlbumGrid.styles';

interface AlbumGridProps {
  albums: Album[];
}

export function AlbumGrid({ albums }: AlbumGridProps) {
  if (albums.length === 0) {
    return <EmptyState>No albums found. Try adjusting your search.</EmptyState>;
  }

  return (
    <GridWrapper>
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </GridWrapper>
  );
}
