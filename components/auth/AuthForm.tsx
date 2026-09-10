"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { fetchRetry } from "@/lib/fetch-retry";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/careers";
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };
    const res = await fetchRetry(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    let data: { error?: string } = {};
    try {
      data = (await res.json()) as { error?: string };
    } catch {
      setPending(false);
      setError(
        "Server error. DATABASE_URL on Vercel must be a public Postgres URL, not 127.0.0.1.",
      );
      return;
    }
    setPending(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <PageShell>
      <section className="section-shell mx-auto max-w-md pb-24 pt-36">
        <h1 className="text-3xl">
          {mode === "login" ? "Log in" : "Create an account"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          {mode === "login"
            ? "Sign in to apply for open roles."
            : "Sign up to submit your CV and details."}
        </p>
        <form onSubmit={(e) => void onSubmit(e)} className="mt-8 space-y-4">
          {mode === "signup" && (
            <label className="block text-sm font-medium text-ink">
              Name
              <input
                name="name"
                required
                autoComplete="name"
                className="mt-1.5 w-full rounded-xl border border-ink/20 bg-ink/[0.04] px-3 py-3 outline-none focus:border-brand-orange/60"
              />
            </label>
          )}
          <label className="block text-sm font-medium text-ink">
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-ink/20 bg-ink/[0.04] px-3 py-3 outline-none focus:border-brand-orange/60"
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={mode === "signup" ? 8 : 1}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              className="mt-1.5 w-full rounded-xl border border-ink/20 bg-ink/[0.04] px-3 py-3 outline-none focus:border-brand-orange/60"
            />
          </label>
          {error && <p className="text-sm text-brand-red">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-brand-gradient py-3 font-sans text-sm font-semibold text-obsidian disabled:opacity-60"
          >
            {pending ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>
        <p className="mt-6 text-sm text-ink/70">
          {mode === "login" ? (
            <>
              No account?{" "}
              <Link
                className="text-brand-orange"
                href={`/signup?next=${encodeURIComponent(next)}`}
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already registered?{" "}
              <Link
                className="text-brand-orange"
                href={`/login?next=${encodeURIComponent(next)}`}
              >
                Log in
              </Link>
            </>
          )}
        </p>
      </section>
    </PageShell>
  );
}
