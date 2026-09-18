"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { BandDecor } from "@/components/ui/BandDecor";
import { fetchRetry } from "@/lib/fetch-retry";
import { validateLogin, validateSignup, type FieldErrors } from "@/lib/auth-validate";
import { useLocale } from "@/lib/i18n";

const inputClass =
  "mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 outline-none transition-colors focus:border-ink/30 dark:bg-white/[0.06]";

function fieldClass(invalid?: string) {
  return `${inputClass} ${invalid ? "border-brand-red/50" : "border-ink/20"}`;
}

export function AuthForm({
  mode,
  audience = "user",
  withShell = true,
}: {
  mode: "login" | "signup";
  audience?: "user" | "admin";
  withShell?: boolean;
}) {
  const { t } = useLocale();
  const err = (code?: string) =>
    (code && t.auth.errors[code]) || code || "";
  const router = useRouter();
  const params = useSearchParams();
  const next =
    params.get("next") || (audience === "admin" ? "/admin" : "/careers");
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
      setError(err(checked.error));
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
      setError(t.auth.server);
      return;
    }
    setPending(false);
    if (!res.ok) {
      setFields(data.fields ?? {});
      setError(err(data.error) || t.auth.generic);
      return;
    }
    router.push(next);
    router.refresh();
  }

  const form = (
    <section className="band-canvas relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <BandDecor />
      <div className="section-shell relative mx-auto max-w-md">
        <h1 className="font-sans text-[1.85rem] font-semibold tracking-tight text-ink">
          {mode === "login"
            ? audience === "admin"
              ? t.auth.adminLogin
              : t.auth.login
            : t.auth.signup}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          {mode === "login"
            ? audience === "admin"
              ? t.auth.adminBody
              : t.auth.loginBody
            : t.auth.signupBody}
        </p>
        <form
          onSubmit={(e) => void onSubmit(e)}
          className="mt-8 space-y-4"
          noValidate
        >
          {mode === "signup" && (
            <label className="block text-sm font-medium text-ink">
              {t.auth.fullName}
              <input
                name="name"
                required
                autoComplete="name"
                aria-invalid={Boolean(fields.name)}
                className={fieldClass(fields.name)}
              />
              {fields.name && (
                <span className="mt-1 block text-sm font-normal text-brand-red">
                {err(fields.name)}
                </span>
              )}
            </label>
          )}
          <label className="block text-sm font-medium text-ink">
            {t.auth.email}
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
                {err(fields.email)}
              </span>
            )}
          </label>
          {mode === "signup" && (
            <label className="block text-sm font-medium text-ink">
              {t.auth.confirmEmail}
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
                  {err(fields.emailConfirm)}
                </span>
              )}
            </label>
          )}
          <label className="block text-sm font-medium text-ink">
            {t.auth.password}
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
                {t.auth.passwordHint}
              </span>
            )}
            {fields.password && (
              <span className="mt-1 block text-sm font-normal text-brand-red">
                {err(fields.password)}
              </span>
            )}
          </label>
          {mode === "signup" && (
            <label className="block text-sm font-medium text-ink">
              {t.auth.confirmPassword}
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
                  {err(fields.passwordConfirm)}
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
            className="w-full rounded-full bg-brand-orange py-3.5 font-sans text-sm font-semibold tracking-[0.04em] text-white transition-colors hover:bg-brand-orange/90 disabled:opacity-60"
          >
            {pending
              ? t.auth.wait
              : mode === "login"
                ? t.auth.logIn
                : t.auth.createAccount}
          </button>
        </form>
        {audience === "user" ? (
        <p className="mt-6 text-sm text-ink/70">
          {mode === "login" ? (
            <>
              {t.auth.noAccount}{" "}
              <Link
                className="text-brand-orange"
                href={`/signup?next=${encodeURIComponent(next)}`}
              >
                {t.auth.signUp}
              </Link>
            </>
          ) : (
            <>
              {t.auth.already}{" "}
              <Link
                className="text-brand-orange"
                href={`/login?next=${encodeURIComponent(next)}`}
              >
                {t.auth.logIn}
              </Link>
            </>
          )}
        </p>
        ) : null}
      </div>
    </section>
  );

  if (!withShell) return form;
  return <PageShell expertCta={false}>{form}</PageShell>;
}
