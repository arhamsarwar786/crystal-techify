"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { excerpt } from "@/lib/jobs";

interface JobTile {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string;
  employmentType: string;
  salaryRange: string | null;
  description: string;
}

export function CareersJobsList({
  jobs,
  dbDown,
  loggedIn,
}: {
  jobs: JobTile[];
  dbDown: boolean;
  loggedIn: boolean;
}) {
  const { t } = useLocale();

  return (
    <>
      <p className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">
        <span aria-hidden className="h-px w-6 bg-brand-orange" />
        {t.careers.kicker}
      </p>
      <h1 className="mt-3 max-w-2xl font-sans text-[1.85rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2.5rem]">
        {t.careers.title}
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-ink/60">
        {t.careers.body}
      </p>
      <ul className="mt-10 space-y-3">
        {dbDown && (
          <li className="rounded-2xl border border-brand-red/30 bg-brand-red/10 px-4 py-10 text-center text-sm text-ink">
            {t.careers.dbDown}
          </li>
        )}
        {!dbDown && jobs.length === 0 && (
          <li className="rounded-2xl border border-dashed border-ink/20 px-4 py-10 text-center text-sm text-ink/70">
            {t.careers.empty}
          </li>
        )}
        {jobs.map((job) => {
          const applyHref = loggedIn
            ? `/careers/${job.slug}#apply`
            : `/login?next=${encodeURIComponent(`/careers/${job.slug}`)}`;
          return (
            <li key={job.id} className="card-on-canvas card-static">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  {job.department ? (
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                      {job.department}
                    </p>
                  ) : null}
                  <h2 className="mt-1 font-sans text-lg font-semibold tracking-tight text-ink">
                    {job.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink/70">
                    {job.location} · {job.employmentType}
                    {job.salaryRange ? ` · ${job.salaryRange}` : ""}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/75">
                    {excerpt(job.description)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Link
                    href={`/careers/${job.slug}`}
                    className="inline-flex items-center rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:border-ink/30 hover:text-ink dark:border-white/15 dark:text-white/80"
                  >
                    {t.common.viewRole}
                  </Link>
                  <Link
                    href={applyHref}
                    className="inline-flex items-center rounded-full bg-brand-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-orange/90"
                  >
                    {t.common.applyNow}
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
