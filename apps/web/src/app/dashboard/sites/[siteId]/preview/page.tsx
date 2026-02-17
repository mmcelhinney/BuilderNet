import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@buildernet/database";
import { PreviewFrame } from "./preview-frame";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  const { siteId } = await params;

  const site = await prisma.site.findFirst({
    where: { id: siteId, userId: session.userId },
    include: { theme: true },
  });
  if (!site) notFound();

  const themeConfig = (site.theme?.config as Record<string, unknown>) ?? {};
  const themeWithSiteId = { ...themeConfig, siteId: site.id };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">
          Preview: {site.name}
        </span>
        <a
          href={`/dashboard/sites/${siteId}/edit`}
          className="text-sm text-slate-600 hover:text-slate-900 underline"
        >
          Back to editor
        </a>
      </header>
      <main className="flex-1 overflow-auto">
        <PreviewFrame siteId={siteId} theme={themeWithSiteId} />
      </main>
    </div>
  );
}
