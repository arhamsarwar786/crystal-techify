import { PrismaClient } from "@prisma/client";

function hostnameOf(raw: string) {
  try {
    return new URL(raw.replace(/^postgres:/i, "postgresql:")).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isLoopback(raw: string) {
  const host = hostnameOf(raw);
  return !host || host === "localhost" || host === "127.0.0.1" || host === "::1";
}

function rawDatabaseUrl() {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.NEON_DATABASE_URL,
    process.env.NEON_URL,
  ]
    .map((value) => value?.trim() || "")
    .filter(Boolean);

  const remote = candidates.find((url) => !isLoopback(url));
  if (remote) return remote;
  if (process.env.VERCEL) return "";
  return candidates[0] || "";
}

function databaseUrl() {
  const raw = rawDatabaseUrl();
  if (!raw) return raw;
  try {
    const url = new URL(raw.replace(/^postgres:/i, "postgresql:"));
    url.searchParams.delete("channel_binding");
    if (!url.searchParams.has("sslmode") && !isLoopback(raw)) {
      url.searchParams.set("sslmode", "require");
    }
    if (!url.searchParams.has("connect_timeout")) {
      url.searchParams.set("connect_timeout", "15");
    }
    if (
      url.hostname.includes("-pooler") &&
      !url.searchParams.has("pgbouncer")
    ) {
      url.searchParams.set("pgbouncer", "true");
    }
    return url.toString();
  } catch {
    return raw;
  }
}

function isTransientDbError(err: unknown) {
  const code =
    typeof err === "object" && err && "code" in err
      ? String((err as { code: unknown }).code)
      : "";
  const message = err instanceof Error ? err.message : String(err);
  return (
    code === "P1001" ||
    code === "P1017" ||
    /can't reach database|timed out|connection reset|server closed the connection|too many clients/i.test(
      message,
    )
  );
}

async function withRetry<T>(run: () => Promise<T>): Promise<T> {
  let last: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await run();
    } catch (err) {
      last = err;
      if (!isTransientDbError(err) || attempt === 2) throw err;
      await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
    }
  }
  throw last;
}

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrisma>;
};

function createPrisma() {
  const url = databaseUrl();
  const client = new PrismaClient({
    log: ["error"],
    ...(url ? { datasources: { db: { url } } } : {}),
  });

  return client.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          return withRetry(() => query(args));
        },
      },
    },
  });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

globalForPrisma.prisma = prisma;
