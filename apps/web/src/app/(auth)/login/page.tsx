import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            BuilderNet
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-600">Sign in to your account to continue</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-slate-900 hover:underline">
            Start free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
