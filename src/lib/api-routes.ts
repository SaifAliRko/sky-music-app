/**
 * API Route helpers and utilities
 * Provides standardized error handling and response formatting for API routes
 */

import { NextResponse } from 'next/server';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  error: string;
  details?: string;
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
  message: string,
  statusCode: number = 500,
  details?: string
): NextResponse<ErrorResponse> {
  const response: ErrorResponse = { error: message };
  if (details) response.details = details;
  
  return NextResponse.json(response, { status: statusCode });
}

/**
 * Wrap async route handler with error handling
 */
export async function handleApiRoute<T>(
  handler: () => Promise<T>
): Promise<NextResponse<T | ErrorResponse>> {
  try {
    const result = await handler();
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('API route error:', message);
    return createErrorResponse('Internal server error', 500, message);
  }
}
