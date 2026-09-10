"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { fetchRetry } from "@/lib/fetch-retry";
import {
  type FieldErrors,
  validateLogin,
  validateSignup,
} from "@/lib/auth-validate";

const inputClass =
  "mt-1.5 w-full rounded-xl border bg-ink/[0.04] px-3 py-3 outline-none focus:border-brand-orange/60";

function fieldClass(invalid?: string) {
  return `${inputClass} ${invalid ? "border-brand-red/50" : "border-ink/20"}`;
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/careers";
  const [error, setError] = useState("");
  const [fields, setFields] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFields({});
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      emailConfirm: String(form.get("emailConfirm") ?? ""),
      password: String(form.get("password") ?? ""),
      passwordConfirm: String(form.get("passwordConfirm") ?? ""),
    };

    const checked =
      mode === "signup" ? validateSignup(payload) : validateLogin(payload);
    if (!checked.ok) {
      setFields(checked.fields);
      setError(checked.error);
      return;
    }

    setPending(true);
    const res = await fetchRetry(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checked),
    });
    let data: { error?: string; fields?: FieldErrors } = {};
    try {
      data = (await res.json()) as { error?: string; fields?: FieldErrors };
    } catch {
      setPending(false);
      setError("The server could not be reached. Wait a few seconds and try again.");
      return;
    }
    setPending(false);
    if (!res.ok) {
      setFields(data.fields ?? {});
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
            : "Sign up to submit your CV. We will verify your name, email, and password before creating the account."}
        </p>
        <form
          onSubmit={(e) => void onSubmit(e)}
          className="mt-8 space-y-4"
          noValidate
        >
          {mode === "signup" && (
            <label className="block text-sm font-medium text-ink">
              Full name
              <input
                name="name"
                required
                autoComplete="name"
                aria-invalid={Boolean(fields.name)}
                className={fieldClass(fields.name)}
              />
              {fields.name && (
                <span className="mt-1 block text-sm font-normal text-brand-red">
                  {fields.name}
                </span>
              )}
            </label>
          )}
          <label className="block text-sm font-medium text-ink">
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={Boolean(fields.email)}
              className={fieldClass(fields.email)}
            />
            {fields.email && (
              <span className="mt-1 block text-sm font-normal text-brand-red">
                {fields.email}
              </span>
            )}
          </label>
          {mode === "signup" && (
            <label className="block text-sm font-medium text-ink">
              Confirm email
              <input
                name="emailConfirm"
                type="email"
                required
                autoComplete="email"
                aria-invalid={Boolean(fields.emailConfirm)}
                className={fieldClass(fields.emailConfirm)}
              />
              {fields.emailConfirm && (
                <span className="mt-1 block text-sm font-normal text-brand-red">
                  {fields.emailConfirm}
                </span>
              )}
            </label>
          )}
          <label className="block text-sm font-medium text-ink">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={mode === "signup" ? 8 : 1}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              aria-invalid={Boolean(fields.password)}
              className={fieldClass(fields.password)}
            />
            {mode === "signup" && (
              <span className="mt-1 block text-xs font-normal text-ink/60">
                At least 8 characters, including a letter and a number.
              </span>
            )}
            {fields.password && (
              <span className="mt-1 block text-sm font-normal text-brand-red">
                {fields.password}
              </span>
            )}
          </label>
          {mode === "signup" && (
            <label className="block text-sm font-medium text-ink">
              Confirm password
              <input
                name="passwordConfirm"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                aria-invalid={Boolean(fields.passwordConfirm)}
                className={fieldClass(fields.passwordConfirm)}
              />
              {fields.passwordConfirm && (
                <span className="mt-1 block text-sm font-normal text-brand-red">
                  {fields.passwordConfirm}
                </span>
              )}
            </label>
          )}
          {error && (
            <p className="text-sm text-brand-red" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-brand-gradient py-3 font-sans text-sm font-semibold text-obsidian disabled:opacity-60"
          >
            {pending ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
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
