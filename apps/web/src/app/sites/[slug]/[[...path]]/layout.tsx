import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@buildernet/database";

export default async function PublicSiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await prisma.site.findUnique({ where: { slug } });
  if (!site) notFound();
  return <>{children}</>;
}
