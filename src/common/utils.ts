export function trimEmptySpaces(value: string) {
  return value && typeof value === 'string' ? value.trim() : value;
}
