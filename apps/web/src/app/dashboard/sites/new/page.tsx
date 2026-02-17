import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@buildernet/database";
import { slugify } from "@buildernet/utils";
import { CreateSiteForm } from "./create-site-form";

export default async function NewSitePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Create a new site</h1>
      <CreateSiteForm />
    </div>
  );
}
