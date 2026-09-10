import { NextResponse } from "next/server";

export function publicDatabaseError(err: unknown) {
  const code =
    typeof err === "object" && err && "code" in err
      ? String((err as { code: unknown }).code)
      : "";
  const message = err instanceof Error ? err.message : String(err);

  if (/127\.0\.0\.1|localhost/i.test(message)) {
    return "Database is unreachable from Vercel. Set DATABASE_URL in Environment Variables to a public Postgres URL, not 127.0.0.1.";
  }
  if (code === "P1001" || /can't reach database|timed out/i.test(message)) {
    return "The database is waking up. Wait a few seconds and try again.";
  }
  if (code === "P2021" || /does not exist/i.test(message)) {
    return "Database tables are missing. Set a public DATABASE_URL and redeploy so migrations can run.";
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
