import { z } from "zod";

/** Zod schemas for block configs (validation in editor & API) */
export const heroBlockConfigSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  backgroundType: z.enum(["image", "video"]).default("image"),
  backgroundImage: z.string().url().optional().nullable(),
  backgroundVideo: z.string().url().optional().nullable(),
  overlay: z.boolean().default(true),
  overlayOpacity: z.number().min(0).max(1).default(0.4),
  ctaPrimary: z.string().optional(),
  ctaPrimaryUrl: z.string().optional(),
  ctaSecondary: z.string().optional(),
  ctaSecondaryUrl: z.string().optional(),
});

export const textBlockConfigSchema = z.object({
  content: z.string(),
  alignment: z.enum(["left", "center", "right"]).default("left"),
});

export const formBlockConfigSchema = z.object({
  formId: z.string(),
});

export type HeroBlockConfig = z.infer<typeof heroBlockConfigSchema>;
export type TextBlockConfig = z.infer<typeof textBlockConfigSchema>;
export type FormBlockConfig = z.infer<typeof formBlockConfigSchema>;
