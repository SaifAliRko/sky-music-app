/**
 * API Route: GET /api/albums
 * Returns top 100 albums from iTunes
 * Acts as CORS proxy to avoid client-side CORS issues
 */

import { fetchTopAlbums } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const albums = await fetchTopAlbums();
    return NextResponse.json(albums);
  } catch (error) {
    console.error('Error in /api/albums:', error);
    return NextResponse.json(
      { error: 'Failed to fetch albums' },
      { status: 500 }
    );
  }
}
