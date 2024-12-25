import { Controller } from '@nestjs/common';

// We'll use a utility function to create the base path
export function TrackingController(path: string): ClassDecorator {
  return Controller(`tracking/${path}`);
}
