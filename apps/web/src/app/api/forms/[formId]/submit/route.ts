import { NextResponse } from "next/server";
import { prisma } from "@buildernet/database";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const { formId } = await params;
    const body = await req.formData().catch(() => req.json().catch(() => ({})));
    const data = Object.fromEntries(
      body instanceof FormData ? body.entries() : Object.entries(body as object)
    );
    const form = await prisma.form.findUnique({ where: { id: formId } });
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    await prisma.formSubmission.create({
      data: {
        formId,
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
