import { NextResponse } from "next/server";
import { prisma } from "@buildernet/database";

const ALLOWED_TEMPLATES = ["contact", "review", "general_enquiry"] as const;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { siteId, blockId, formTemplate, ...data } = body as {
      siteId?: string;
      blockId?: string;
      formTemplate?: string;
      [k: string]: unknown;
    };
    if (!siteId || !blockId || !formTemplate) {
      return NextResponse.json(
        { error: "siteId, blockId and formTemplate required" },
        { status: 400 }
      );
    }
    if (!ALLOWED_TEMPLATES.includes(formTemplate as (typeof ALLOWED_TEMPLATES)[number])) {
      return NextResponse.json({ error: "Invalid formTemplate" }, { status: 400 });
    }
    const site = await prisma.site.findUnique({ where: { id: siteId } });
    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }
    await prisma.blockFormSubmission.create({
      data: {
        siteId,
        blockId,
        formTemplate,
        data: data as object,
        ip: req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? undefined,
        userAgent: req.headers.get("user-agent") ?? undefined,
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
