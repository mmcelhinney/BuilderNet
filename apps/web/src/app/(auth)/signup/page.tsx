import Link from "next/link";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            BuilderNet
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-slate-900">Start your free trial</h1>
          <p className="mt-2 text-slate-600">14 days free. No credit card required.</p>
        </div>
        <SignupForm />
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-slate-900 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
