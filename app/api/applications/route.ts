import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  answersFromForm,
  missingRequiredAnswers,
  parseQuestions,
} from "@/lib/job-questions";
import { requireUser } from "@/lib/session";
import { saveCv } from "@/lib/storage";
import { jsonDatabaseError } from "@/lib/db-error";

export async function POST(request: Request) {
  const session = requireUser();
  if (!session) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const form = await request.formData();
  const jobId = String(form.get("jobId") ?? "");
  const phone = String(form.get("phone") ?? "").trim();
  const coverNote = String(form.get("coverNote") ?? "").trim();
  const file = form.get("cv");

  if (!jobId || !phone || !(file instanceof File)) {
    return NextResponse.json(
      { error: "Phone and CV are required" },
      { status: 400 },
    );
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "CV must be under 8MB" }, { status: 400 });
  }

  try {
    const job = await prisma.job.findFirst({ where: { id: jobId, active: true } });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const questions = parseQuestions(job.questions);
    const answers = answersFromForm(questions, form);
    if (missingRequiredAnswers(answers)) {
      return NextResponse.json(
        { error: "Please answer all required questions" },
        { status: 400 },
      );
    }

    const existing = await prisma.application.findFirst({
      where: { userId: session.id, jobId },
    });
    if (existing) {
      return NextResponse.json(
        { error: "You have already applied to this role" },
        { status: 409 },
      );
    }

    const ext = path.extname(file.name || "").slice(0, 8) || ".bin";
    const filename = `${session.id}-${jobId}-${Date.now()}${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());
    const cvPath = await saveCv(filename, buf);

    const application = await prisma.application.create({
      data: {
        userId: session.id,
        jobId,
        phone,
        coverNote,
        cvPath,
        answers: JSON.stringify(answers),
      },
    });

    return NextResponse.json({ id: application.id });
  } catch (err) {
    return jsonDatabaseError(err);
  }
}
