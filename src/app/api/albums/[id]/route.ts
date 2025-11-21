/**
 * API Route: GET /api/albums/[id]
 * Returns album details and tracks for a specific album
 * Acts as CORS proxy to avoid client-side CORS issues
 */

import { fetchAlbumDetails } from '@/lib/api';
import { createErrorResponse, handleApiRoute } from '@/lib/api-routes';

export async function GET(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return createErrorResponse('Album ID is required', 400);
  }

  return handleApiRoute(() => fetchAlbumDetails(id));
}
