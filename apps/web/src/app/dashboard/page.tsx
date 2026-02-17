import Link from "next/link";
import { prisma } from "@buildernet/database";
import { getSession } from "@/lib/auth";
import { Button, Card, CardContent } from "@buildernet/ui";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const sites = await prisma.site.findMany({
    where: { userId: session.userId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-slate-600">
            Manage your sites and view reports.
          </p>
        </div>
        <Link href="/dashboard/sites/new">
          <Button size="lg">Create site</Button>
        </Link>
      </div>

      {/* Reports / Analytics thumbnail – large card linking to Analytics (TBD) */}
      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Reports
        </h2>
        <Link href="/dashboard/analytics" className="block">
          <Card className="overflow-hidden transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-6 p-0 sm:flex-row sm:items-stretch">
              <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white sm:p-8">
                <div>
                  <h3 className="text-xl font-semibold sm:text-2xl">Site visits & analytics</h3>
                  <p className="mt-2 max-w-md text-sm text-slate-300">
                    View traffic, page views, and visitor insights across your sites. Reports and charts (coming soon).
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-200">
                  View analytics →
                </span>
              </div>
              <div className="flex min-h-[160px] flex-1 items-center justify-center bg-slate-100 p-6 sm:min-w-[240px]">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-2xl">
                    📊
                  </div>
                  <p className="text-xs font-medium text-slate-500">Reports (TBD)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* All your sites */}
      <section id="sites">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Your sites
        </h2>
        {sites.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-slate-600">You haven’t created any sites yet.</p>
              <Link href="/dashboard/sites/new" className="mt-4 inline-block">
                <Button>Create your first site</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((site) => (
              <Card
                key={site.id}
                className="flex flex-col transition-shadow hover:shadow-md"
              >
                <CardContent className="flex flex-1 flex-col p-5">
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-semibold text-slate-900">{site.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {site.slug}.buildernet.app
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      Updated {formatDate(site.updatedAt)}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/dashboard/sites/${site.id}/edit`}>
                      <Button size="sm" variant="default">
                        Edit
                      </Button>
                    </Link>
                    <Link
                      href={`/dashboard/sites/${site.id}/preview`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline">
                        Preview
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
