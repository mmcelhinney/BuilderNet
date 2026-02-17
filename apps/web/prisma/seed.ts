/**
 * Seed script: creates test users, sites, themes, and home pages.
 * Run: pnpm db:seed (from repo root) after db:push. Requires DATABASE_URL.
 */
import path from "path";
import { config } from "dotenv";

// Load apps/web/.env.local when running via pnpm db:seed (cwd is apps/web)
config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), "../.env") });

import { prisma } from "@buildernet/database";
import bcrypt from "bcryptjs";

const TEST_ACCOUNTS = [
  { email: "demo@buildernet.app", name: "Demo User", password: "demo1234", siteSlug: "demo", siteName: "Demo Site" },
  { email: "alice@buildernet.app", name: "Alice Test", password: "password123", siteSlug: "alice-site", siteName: "Alice's Site" },
  { email: "bob@buildernet.app", name: "Bob Test", password: "password123", siteSlug: "bob-site", siteName: "Bob's Site" },
] as const;

async function main() {
  const defaultThemeConfig = {
    colors: {
      primary: "#0f172a",
      secondary: "#64748b",
      accent: "#3b82f6",
      background: "#ffffff",
      foreground: "#0f172a",
      muted: "#f1f5f9",
    },
    typography: { fontHeading: "var(--font-sans)", fontBody: "var(--font-sans)", baseSize: "16px", scale: 1.25 },
    spacing: { section: "5rem", block: "1rem" },
    radius: { button: "0.5rem", card: "0.75rem", input: "0.5rem" },
    buttons: { primaryStyle: "solid", borderRadius: "0.5rem" },
  };

  const defaultBlocks = [
    {
      id: "block_hero_1",
      type: "hero",
      config: {
        title: "Welcome to BuilderNet",
        subtitle: "Build beautiful websites with drag and drop. No code required.",
        backgroundType: "image",
        backgroundImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200",
        overlay: true,
        overlayOpacity: 0.5,
        ctaPrimary: "Get started",
        ctaPrimaryUrl: "/signup",
        ctaSecondary: "Learn more",
        ctaSecondaryUrl: "#",
      },
      animation: "fade",
    },
    {
      id: "block_text_1",
      type: "text",
      config: {
        content: "This is a demo site. Edit it in the dashboard to add more blocks and publish when you're ready.",
        alignment: "center",
      },
      animation: "slideUp",
    },
  ];

  for (const account of TEST_ACCOUNTS) {
    const passwordHash = await bcrypt.hash(account.password, 10);
    const user = await prisma.user.upsert({
      where: { email: account.email },
      update: { name: account.name, passwordHash },
      create: {
        email: account.email,
        name: account.name,
        passwordHash,
      },
    });

    const theme = await prisma.theme.create({
      data: { name: "Default", config: defaultThemeConfig },
    });

    const site = await prisma.site.upsert({
      where: { slug: account.siteSlug },
      update: { themeId: theme.id, name: account.siteName },
      create: {
        name: account.siteName,
        slug: account.siteSlug,
        userId: user.id,
        themeId: theme.id,
      },
    });

    const existing = await prisma.page.findFirst({
      where: { siteId: site.id, slug: "" },
    });
    if (existing) {
      await prisma.page.update({
        where: { id: existing.id },
        data: { blocks: defaultBlocks as object, published: true },
      });
    } else {
      await prisma.page.create({
        data: {
          siteId: site.id,
          title: "Home",
          slug: "",
          blocks: defaultBlocks as object,
          published: true,
          sortOrder: 0,
        },
      });
    }
  }

  console.log("Seed complete. Test accounts created. See TEST-ACCOUNTS.md for login details.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
