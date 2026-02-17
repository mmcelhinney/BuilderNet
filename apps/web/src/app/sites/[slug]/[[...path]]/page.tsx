import { notFound } from "next/navigation";
import { prisma } from "@buildernet/database";
import { blockComponents } from "@buildernet/blocks";
import type { PageBlock } from "@buildernet/utils";

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
      {blocks.map((block) => {
        const Component = blockComponents[block.type];
        if (!Component) return null;
        return <Component key={block.id} block={block} theme={themeConfig} isEditor={false} />;
      })}
    </div>
  );
}
