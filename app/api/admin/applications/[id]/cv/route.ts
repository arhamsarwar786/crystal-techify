import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { readCv } from "@/lib/storage";

interface Ctx {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Ctx) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const application = await prisma.application.findUnique({
    where: { id: params.id },
  });
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const file = await readCv(application.cvPath);
  if (!file) {
    return NextResponse.json({ error: "File missing" }, { status: 404 });
  }

  return new NextResponse(file.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    },
  });
}
