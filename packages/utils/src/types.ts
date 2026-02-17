/**
 * Shared types for blocks, pages, and editor state.
 */

export type BlockType =
  | "hero"
  | "text"
  | "textImage"
  | "richText"
  | "code"
  | "accordion"
  | "pricing"
  | "carousel"
  | "social"
  | "reviews"
  | "people"
  | "form"
  | "header"
  | "footer";

/** Single block in page layout (stored in Page.blocks JSON) */
export interface PageBlock {
  id: string;
  type: BlockType;
  /** Grid position/size: colSpan, rowSpan, etc. */
  grid?: { colSpan?: number; rowSpan?: number };
  /** Block-specific config (varies by type) */
  config: Record<string, unknown>;
  /** Animation on scroll */
  animation?: "none" | "fade" | "slideUp" | "slideLeft" | "zoom";
}

/** SEO payload stored in Page.seo */
export interface PageSeo {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  schema?: Record<string, unknown>;
}

/** Form field definition (stored in Form.fields) */
export interface FormFieldConfig {
  id: string;
  type: "text" | "email" | "textarea" | "select" | "checkbox";
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}
