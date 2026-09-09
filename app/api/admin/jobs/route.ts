import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jobWriteData, type JobPayload } from "@/lib/job-write";
import { parseQuestions } from "@/lib/job-questions";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function withQuestions<T extends { questions: string }>(job: T) {
  return { ...job, questions: parseQuestions(job.questions) };
}

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });
  return NextResponse.json({ jobs: jobs.map(withQuestions) });
}

export async function POST(request: Request) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as JobPayload;
  const title = body.title?.trim() ?? "";
  if (!title) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }
  let slug = slugify(title);
  const clash = await prisma.job.findUnique({ where: { slug } });
  if (clash) slug = `${slug}-${Date.now().toString(36)}`;

  const job = await prisma.job.create({
    data: { ...jobWriteData(body, "create"), slug },
  });
  return NextResponse.json({ job: withQuestions(job) });
}
