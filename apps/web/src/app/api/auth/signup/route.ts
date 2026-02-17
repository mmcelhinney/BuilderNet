import { NextResponse } from "next/server";
import { prisma } from "@buildernet/database";
import bcrypt from "bcryptjs";
import { createSession, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        error:
          "Server is missing DATABASE_URL. Create apps/web/.env.local (or root .env) and set DATABASE_URL, then restart the dev server.",
      },
      { status: 500 }
    );
  }
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name: name || null, passwordHash },
    });
    const token = await createSession({ userId: user.id, email: user.email });
    await setSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    const message =
      process.env.NODE_ENV === "development" && e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
