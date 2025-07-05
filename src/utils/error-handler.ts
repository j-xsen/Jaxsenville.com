// Centralized error handling for Contentful operations
export class ContentfulError extends Error {
  constructor(message: string, public context: string, public originalError?: unknown) {
    super(message);
    this.name = 'ContentfulError';
  }
}

export function handleContentfulError(error: unknown, context: string): never {
  const errorMessage = error instanceof Error ? error.message : String(error);
  throw new ContentfulError(
    `Failed to fetch ${context}: ${errorMessage}`,
    context,
    error
  );
}

export function logError(error: unknown, context: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}] Error:`, error);
  }
  // In production, you might want to send to a logging service
} 