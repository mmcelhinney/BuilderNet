import { z } from "zod";

/** Theme config stored in Theme.config - global styles */
export const themeConfigSchema = z.object({
  colors: z.object({
    primary: z.string().default("#0f172a"),
    secondary: z.string().default("#64748b"),
    accent: z.string().default("#3b82f6"),
    background: z.string().default("#ffffff"),
    foreground: z.string().default("#0f172a"),
    muted: z.string().default("#f1f5f9"),
  }),
  typography: z.object({
    fontHeading: z.string().default("var(--font-geist-sans)"),
    fontBody: z.string().default("var(--font-geist-sans)"),
    baseSize: z.string().default("16px"),
    scale: z.number().default(1.25),
  }),
  spacing: z.object({
    section: z.string().default("5rem"),
    block: z.string().default("1rem"),
  }),
  radius: z.object({
    button: z.string().default("0.5rem"),
    card: z.string().default("0.75rem"),
    input: z.string().default("0.5rem"),
  }),
  shadows: z.object({
    sm: z.string().optional(),
    md: z.string().optional(),
    lg: z.string().optional(),
  }),
  buttons: z.object({
    primaryStyle: z.enum(["solid", "outline", "ghost"]).default("solid"),
    borderRadius: z.string().default("0.5rem"),
  }),
});

export type ThemeConfig = z.infer<typeof themeConfigSchema>;

/** Default theme - use when no theme or partial theme is present */
export const defaultThemeConfig: ThemeConfig = {
  colors: {
    primary: "#0f172a",
    secondary: "#64748b",
    accent: "#3b82f6",
    background: "#ffffff",
    foreground: "#0f172a",
    muted: "#f1f5f9",
  },
  typography: {
    fontHeading: "var(--font-sans)",
    fontBody: "var(--font-sans)",
    baseSize: "16px",
    scale: 1.25,
  },
  spacing: {
    section: "5rem",
    block: "1rem",
  },
  radius: {
    button: "0.5rem",
    card: "0.75rem",
    input: "0.5rem",
  },
  shadows: {},
  buttons: {
    primaryStyle: "solid",
    borderRadius: "0.5rem",
  },
};
