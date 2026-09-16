import type { DeepPartial } from "./types";

export function deepMerge<T>(base: T, overlay?: DeepPartial<T>): T {
  if (overlay === undefined || overlay === null) return base;
  if (Array.isArray(overlay)) {
    return overlay as T;
  }
  if (typeof base !== "object" || base === null || typeof overlay !== "object") {
    return overlay as T;
  }
  const out = { ...(base as object) } as T;
  for (const key of Object.keys(overlay) as (keyof T)[]) {
    const next = overlay[key as keyof DeepPartial<T>];
    if (next === undefined) continue;
    (out as Record<string, unknown>)[key as string] = deepMerge(
      (base as Record<string, unknown>)[key as string],
      next as never,
    );
  }
  return out;
}

export function fmt(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? ""),
  );
}
