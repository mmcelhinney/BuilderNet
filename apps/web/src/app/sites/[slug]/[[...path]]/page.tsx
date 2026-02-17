import { notFound } from "next/navigation";
import { prisma } from "@buildernet/database";
import type { PageBlock } from "@buildernet/utils";
import { BlockRenderer } from "@/components/block-renderer";

export default async function PublicSitePage({
  params,
}: {
  params: Promise<{ slug: string; path?: string[] }>;
}) {
  const { slug, path } = await params;
  const pageSlug = path?.join("/") ?? "";

  const site = await prisma.site.findUnique({
    where: { slug },
    include: {
      pages: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      theme: true,
    },
  });
  if (!site) notFound();

  const page = site.pages.find((p) => p.slug === pageSlug) ?? site.pages.find((p) => p.slug === "" || p.slug === "home");
  if (!page) notFound();

  const blocks = (page.blocks as PageBlock[]) ?? [];
  const themeConfig = { ...((site.theme?.config as Record<string, unknown>) ?? {}), siteId: site.id };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <BlockRenderer blocks={blocks} theme={themeConfig} />
    </div>
  );
}
