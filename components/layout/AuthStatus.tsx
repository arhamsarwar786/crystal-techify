"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export function AuthStatus({ compact = false }: { compact?: boolean }) {
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
      <Link
        href={`/login?next=${encodeURIComponent(pathname)}`}
        className="grid h-10 place-items-center rounded-full px-3 font-display text-[10px] tracking-[0.14em] text-ink/70 hover:text-ink"
      >
        {compact ? "In" : "Log in"}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {user.isAdmin && !compact && (
        <Link
          href="/admin"
          className="rounded-full px-2 py-1 font-display text-[10px] tracking-[0.12em] text-brand-orange hover:text-ink"
        >
          Admin
        </Link>
      )}
      <button
        type="button"
        onClick={() => void logout()}
        className="rounded-full px-3 py-2 font-display text-[10px] tracking-[0.12em] text-ink/70 hover:text-ink"
      >
        {compact ? "Out" : "Log out"}
      </button>
    </div>
  );
}
