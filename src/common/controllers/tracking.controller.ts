import { Controller } from '@nestjs/common';

// We'll use a utility function to create the base path
export function TrackingController(path: string): ClassDecorator {
  const formattedPath = path.startsWith('/') ? path.slice(1) : path;
  return Controller(`tracking/${formattedPath}`);
}
