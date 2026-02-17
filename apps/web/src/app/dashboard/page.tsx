import Link from "next/link";
import { prisma } from "@buildernet/database";
import { getSession } from "@/lib/auth";
import { Button, Card, CardContent } from "@buildernet/ui";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const sites = await prisma.site.findMany({
    where: { userId: session.userId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Your sites</h1>
        <Link href="/dashboard/sites/new">
          <Button>Create site</Button>
        </Link>
      </div>
      {sites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-600 mb-4">You haven’t created any sites yet.</p>
            <Link href="/dashboard/sites/new">
              <Button>Create your first site</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <Link key={site.id} href={`/dashboard/sites/${site.id}/edit`}>
              <Card className="hover:border-slate-300 transition-colors cursor-pointer h-full">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-slate-900">{site.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">{site.slug}.buildernet.app</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
