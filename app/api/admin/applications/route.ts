import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseAnswers } from "@/lib/job-questions";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, name: true, id: true } },
      job: { select: { title: true, slug: true, id: true } },
    },
  });
  return NextResponse.json({
    applications: applications.map((application) => ({
      ...application,
      answers: parseAnswers(application.answers),
    })),
  });
}
