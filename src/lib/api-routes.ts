import { NextResponse } from 'next/server';
export interface ErrorResponse {
  error: string;
  details?: string;
}

export const createErrorResponse = (
  message: string,
  statusCode: number = 500,
  details?: string
): NextResponse<ErrorResponse> => {
  const response: ErrorResponse = { error: message, ...(details && { details }) };
  return NextResponse.json(response, { status: statusCode });
};


export const handleApiRoute = async <T,>(
  handler: () => Promise<T>
): Promise<NextResponse<T | ErrorResponse>> => {
  try {
    return NextResponse.json(await handler());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('API route error:', message);
    return createErrorResponse('Internal server error', 500, message);
  }
};
