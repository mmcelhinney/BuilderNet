import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@buildernet/database";
import { EditorView } from "./editor-view";

export default async function EditSitePage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  const { siteId } = await params;

  const site = await prisma.site.findFirst({
    where: { id: siteId, userId: session.userId },
    include: { pages: { orderBy: { sortOrder: "asc" } } },
  });
  if (!site) notFound();

  const homePage = site.pages.find((p) => p.slug === "" || p.slug === "home") ?? site.pages[0];
  const blocks = (homePage?.blocks as unknown as Array<unknown>) ?? [];

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-xl font-bold text-slate-900">{site.name}</h1>
        <span className="text-slate-500 text-sm">Editing</span>
      </div>
      <EditorView
        siteId={site.id}
        pageId={homePage?.id ?? null}
        initialBlocks={blocks as Array<{ id: string; type: string; config: Record<string, unknown>; animation?: string }>}
      />
    </div>
  );
}
