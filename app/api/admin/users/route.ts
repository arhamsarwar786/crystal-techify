import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jsonDatabaseError } from "@/lib/db-error";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        lastLoginAt: true,
        createdAt: true,
        applications: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            createdAt: true,
            job: { select: { title: true, slug: true } },
          },
        },
        _count: { select: { applications: true } },
      },
    });
    return NextResponse.json({ users });
  } catch (err) {
    return jsonDatabaseError(err);
  }
}
