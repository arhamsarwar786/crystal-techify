"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";

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
    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { error?: string };
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
        <p className="mt-2 text-sm text-ink/55">
          {mode === "login"
            ? "Sign in to apply for open roles."
            : "Sign up to submit your CV and details."}
        </p>
        <form onSubmit={(e) => void onSubmit(e)} className="mt-8 space-y-4">
          {mode === "signup" && (
            <label className="block text-sm">
              Name
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-3 py-2.5 outline-none focus:border-brand-orange/50"
              />
            </label>
          )}
          <label className="block text-sm">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-3 py-2.5 outline-none focus:border-brand-orange/50"
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={mode === "signup" ? 8 : 1}
              className="mt-1 w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-3 py-2.5 outline-none focus:border-brand-orange/50"
            />
          </label>
          {error && <p className="text-sm text-brand-red">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-brand-gradient py-3 font-display text-[12px] tracking-[0.12em] text-obsidian disabled:opacity-60"
          >
            {pending ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>
        <p className="mt-6 text-sm text-ink/50">
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
