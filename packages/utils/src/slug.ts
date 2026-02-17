/**
 * Generate URL-safe slug from string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Generate unique block id for canvas */
export function createBlockId(): string {
  return `block_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}
