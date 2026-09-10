import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/db";
import { validateLogin } from "@/lib/auth-validate";
import { jsonDatabaseError } from "@/lib/db-error";
import { setSessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const checked = validateLogin(body);
  if (!checked.ok) {
    return NextResponse.json(
      { error: checked.error, fields: checked.fields },
      { status: 400 },
    );
  }
  const { email, password } = checked;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await compare(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    setSessionCookie({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    } catch {
      /* lastLoginAt is optional for older DBs */
    }

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
