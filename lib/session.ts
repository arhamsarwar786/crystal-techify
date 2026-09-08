import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "ct_session";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  exp: number;
}

function secret() {
  return process.env.AUTH_SECRET || "dev-insecure-secret-change-me";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function encodeSession(
  user: Omit<SessionUser, "exp">,
  ttlMs = 1000 * 60 * 60 * 24 * 7,
) {
  const body = Buffer.from(
    JSON.stringify({ ...user, exp: Date.now() + ttlMs }),
  ).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function decodeSession(token: string | undefined): SessionUser | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as SessionUser;
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function getSession(): SessionUser | null {
  return decodeSession(cookies().get(SESSION_COOKIE)?.value);
}

export function setSessionCookie(user: Omit<SessionUser, "exp">) {
  cookies().set(SESSION_COOKIE, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearSessionCookie() {
  cookies().set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export function requireUser() {
  const session = getSession();
  if (!session) return null;
  return session;
}

export function requireAdmin() {
  const session = getSession();
  if (!session?.isAdmin) return null;
  return session;
}
