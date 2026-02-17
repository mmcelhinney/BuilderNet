import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@buildernet/database";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { siteId, pageId, blocks } = await req.json();
    if (!siteId || !Array.isArray(blocks)) {
      return NextResponse.json({ error: "siteId and blocks required" }, { status: 400 });
    }
    const site = await prisma.site.findFirst({
      where: { id: siteId, userId: session.userId },
    });
    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }
    if (pageId) {
      await prisma.page.updateMany({
        where: { id: pageId, siteId },
        data: { blocks: blocks as object },
      });
    } else {
      const existing = await prisma.page.findFirst({
        where: { siteId, slug: "" },
      });
      if (existing) {
        await prisma.page.update({
          where: { id: existing.id },
          data: { blocks: blocks as object },
        });
      } else {
        await prisma.page.create({
          data: {
            siteId,
            title: "Home",
            slug: "",
            blocks: blocks as object,
            published: false,
          },
        });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
