import { NextResponse } from "next/server";

export function publicDatabaseError(err: unknown) {
  const code =
    typeof err === "object" && err && "code" in err
      ? String((err as { code: unknown }).code)
      : "";
  const message = err instanceof Error ? err.message : String(err);

  if (/127\.0\.0\.1|localhost/i.test(message)) {
    return "Vercel is still using a laptop database URL. In Vercel → Settings → Environment Variables, delete DATABASE_URL if it contains 127.0.0.1, then paste your Neon URL (a host ending in neon.tech) and Redeploy.";
  }
  if (code === "P1001" || /can't reach database|timed out/i.test(message)) {
    return "The database is waking up. Wait a few seconds and try again.";
  }
  if (code === "P2021" || /does not exist/i.test(message)) {
    return "Database tables are missing. Set a public DATABASE_URL and redeploy so migrations can run.";
  }
  if (/erofs|eacces|enoent|read-only/i.test(message)) {
    return "Could not store the CV. Add BLOB_READ_WRITE_TOKEN in Vercel Storage → Blob.";
  }
  return "Something went wrong. Try again.";
}

export function jsonDatabaseError(err: unknown) {
  console.error(err);
  return NextResponse.json(
    { error: publicDatabaseError(err) },
    { status: 503 },
  );
}
