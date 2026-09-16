"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export function AuthStatus({
  compact: _compact = false,
  inverted = false,
  offerSignup = false,
}: {
  compact?: boolean;
  inverted?: boolean;
  offerSignup?: boolean;
}) {
  const { t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = (await res.json()) as { user: AuthUser | null };
      setUser(data.user);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh, pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    router.refresh();
  }

  if (user === undefined) {
    return <span className="h-10 w-10" />;
  }

  if (!user) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/login?next=${encodeURIComponent(pathname)}`}
          className={`grid h-10 place-items-center rounded-full px-3 font-sans text-sm font-medium ${
            inverted
              ? "text-white/70 hover:text-white"
              : "text-ink/70 hover:text-ink"
          }`}
        >
          {t.auth.logIn}
        </Link>
        {offerSignup ? (
          <Link
            href={`/signup?next=${encodeURIComponent(pathname)}`}
            className="rounded-full border border-ink/15 bg-ink/5 px-4 py-2 font-sans text-sm font-medium text-ink hover:border-brand-orange/40"
          >
            {t.auth.createAccount}
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {user.isAdmin && (
        <Link
          href="/admin"
          className={`rounded-full px-2 py-1 font-sans text-sm font-medium text-brand-orange ${
            inverted ? "hover:text-white" : "hover:text-ink"
          }`}
        >
          {t.auth.admin}
        </Link>
      )}
      <button
        type="button"
        onClick={() => void logout()}
        className={`rounded-full px-3 py-2 font-sans text-sm font-medium ${
          inverted
            ? "text-white/70 hover:text-white"
            : "text-ink/70 hover:text-ink"
        }`}
      >
        {t.auth.logOut}
      </button>
    </div>
  );
}
