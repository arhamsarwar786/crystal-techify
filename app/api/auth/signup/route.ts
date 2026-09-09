import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { jsonDatabaseError } from "@/lib/db-error";
import { setSessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    name?: string;
  };
  const email = body.email?.trim().toLowerCase() ?? "";
  const name = body.name?.trim() ?? "";
  const password = body.password ?? "";
  if (!email || !name || password.length < 8) {
    return NextResponse.json(
      { error: "Name, email, and a password of at least 8 characters are required" },
      { status: 400 },
    );
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with that email already exists" }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: await hash(password, 10),
      },
    });

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    } catch {
      /* lastLoginAt is optional for older DBs */
    }

    setSessionCookie({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    return jsonDatabaseError(err);
  }
}
