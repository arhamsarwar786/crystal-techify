"use strict";

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  "";

if (!process.env.DATABASE_URL) {
  console.error(
    "Missing DATABASE_URL. Add it in Vercel → Settings → Environment Variables.",
  );
  process.exit(1);
}

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
run(bin("prisma"), ["migrate", "deploy"]);
run(bin("next"), ["build"]);
