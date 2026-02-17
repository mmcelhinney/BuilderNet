import Link from "next/link";
import { Button } from "@buildernet/ui";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">BuilderNet</span>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
              Log in
            </Link>
            <Link href="/signup">
              <Button>Start free trial</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-slate-900 max-w-3xl mb-6">
          Build your website in minutes, not days
        </h1>
        <p className="text-xl text-slate-600 text-center max-w-xl mb-10">
          Drag and drop. No code. Beautiful results. Start your 14-day free trial today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/signup"><Button size="lg">Start free trial</Button></Link>
          <Link href="/login"><Button variant="outline" size="lg">Log in</Button></Link>
        </div>
      </main>
    </div>
  );
}
