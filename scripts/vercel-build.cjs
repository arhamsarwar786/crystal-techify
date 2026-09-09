"use strict";

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function hostnameOf(url) {
  try {
    return new URL(url.replace(/^postgres(ql)?:/i, "http:")).hostname;
  } catch {
    return "";
  }
}

function isLoopback(url) {
  const host = hostnameOf(url).toLowerCase();
  return !host || host === "localhost" || host === "127.0.0.1" || host === "::1";
}

const candidates = [
  process.env.DATABASE_URL,
  process.env.POSTGRES_URL,
  process.env.POSTGRES_PRISMA_URL,
  process.env.POSTGRES_URL_NON_POOLING,
  process.env.DATABASE_URL_UNPOOLED,
].filter(Boolean);

const remote = candidates.find((url) => !isLoopback(url));
process.env.DATABASE_URL = remote || candidates[0] || "";

if (!process.env.DATABASE_URL) {
  console.error(
    "Missing DATABASE_URL. Add a public Postgres URL in Vercel → Settings → Environment Variables.",
  );
  process.exit(1);
}

const onVercel = Boolean(process.env.VERCEL);
const usingLoopback = isLoopback(process.env.DATABASE_URL);

function bin(name) {
  const unix = path.join(process.cwd(), "node_modules", ".bin", name);
  const win = `${unix}.cmd`;
  if (process.platform === "win32" && fs.existsSync(win)) return win;
  return unix;
}

function run(file, args) {
  const result = spawnSync(file, args, { stdio: "inherit", env: process.env });
  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  if (result.status) process.exit(result.status);
}

run(bin("prisma"), ["generate"]);

if (onVercel && usingLoopback) {
  console.warn(
    "\nSkipping prisma migrate deploy: DATABASE_URL is 127.0.0.1 / localhost.\n" +
      "Vercel cannot reach Docker on your laptop.\n" +
      "Set DATABASE_URL in Vercel → Settings → Environment Variables to a public Postgres URL (not 127.0.0.1), then redeploy.\n",
  );
} else {
  run(bin("prisma"), ["migrate", "deploy"]);
}

run(bin("next"), ["build"]);
