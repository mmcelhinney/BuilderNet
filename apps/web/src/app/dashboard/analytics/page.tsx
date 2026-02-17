import { getSession } from "@/lib/auth";
import { Card, CardContent } from "@buildernet/ui";

export default async function AnalyticsPage() {
  const session = await getSession();
  if (!session) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Analytics</h1>
        <p className="mt-1 text-slate-600">
          Site visits and reports will appear here.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
            📈
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Coming soon</h2>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            This page will show reports based on visits to your sites: traffic, page views, and visitor insights.
          </p>
          <p className="mt-4 text-xs text-slate-400">(TBD)</p>
        </CardContent>
      </Card>
    </div>
  );
}
