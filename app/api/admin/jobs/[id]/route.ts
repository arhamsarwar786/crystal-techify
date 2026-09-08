import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jobWriteData, type JobPayload } from "@/lib/job-write";
import { requireAdmin } from "@/lib/session";

interface Ctx {
  params: { id: string };
}

export async function PATCH(request: Request, { params }: Ctx) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as JobPayload;
  const job = await prisma.job.update({
    where: { id: params.id },
    data: jobWriteData(body, "update"),
  });
  return NextResponse.json({ job });
}

export async function DELETE(_request: Request, { params }: Ctx) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.job.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
