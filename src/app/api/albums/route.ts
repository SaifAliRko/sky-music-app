/**
 * API Route: GET /api/albums
 * Returns top 100 albums from iTunes
 * Acts as CORS proxy to avoid client-side CORS issues
 */

import { fetchTopAlbums } from '@/lib/api';
import { handleApiRoute } from '@/lib/api-routes';

export async function GET() {
  return handleApiRoute(() => fetchTopAlbums());
}
