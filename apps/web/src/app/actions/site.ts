"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@buildernet/database";
import { slugify } from "@buildernet/utils";

export async function createSite(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/login");
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const slug = slugify(name);
  const existing = await prisma.site.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now().toString(36)}` : slug;
  await prisma.site.create({
    data: { name, slug: finalSlug, userId: session.userId },
  });
  const site = await prisma.site.findFirst({
    where: { userId: session.userId, slug: finalSlug },
  });
  if (site) redirect(`/dashboard/sites/${site.id}/edit`);
}
