import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { validateSignup } from "@/lib/auth-validate";
import { jsonDatabaseError } from "@/lib/db-error";
import { setSessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    emailConfirm?: string;
    password?: string;
    passwordConfirm?: string;
    name?: string;
  };
  const checked = validateSignup({
    name: body.name,
    email: body.email,
    emailConfirm: body.emailConfirm ?? body.email,
    password: body.password,
    passwordConfirm: body.passwordConfirm ?? body.password,
  });
  if (!checked.ok) {
    return NextResponse.json(
      { error: checked.error, fields: checked.fields },
      { status: 400 },
    );
  }
  const { email, name, password } = checked;

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
