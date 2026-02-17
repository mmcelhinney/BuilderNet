import Link from "next/link";
import { Button } from "@buildernet/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-50">
      <h1 className="text-6xl font-bold text-slate-300 mb-2">404</h1>
      <p className="text-slate-600 mb-8">This page couldn’t be found.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline">Log in</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
