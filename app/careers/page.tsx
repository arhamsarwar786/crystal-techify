import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { excerpt } from "@/lib/jobs";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageShell>
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <div className="section-shell relative">
          <p className="font-display text-[10px] uppercase tracking-[0.22em] text-brand-orange">
            Careers
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            Build with Crystal Techify
          </h1>
          <p className="mt-4 max-w-xl text-sm text-ink/60">
            Open roles in AI, product engineering, and delivery. Log in to
            apply with your CV.
          </p>
          <ul className="mt-10 space-y-3">
            {jobs.length === 0 && (
              <li className="rounded-2xl border border-dashed border-ink/15 px-4 py-10 text-center text-sm text-ink/45">
                No open roles right now. Check back soon.
              </li>
            )}
            {jobs.map((job) => (
              <li key={job.id}>
                <Link
                  href={`/careers/${job.slug}`}
                  className="glass gradient-border flex flex-col gap-2 rounded-2xl p-5 transition-colors hover:bg-ink/[0.04] sm:flex-row sm:items-start sm:justify-between"
                >
                  <span className="min-w-0">
                    {job.department ? (
                      <span className="block font-display text-[10px] uppercase tracking-[0.18em] text-brand-orange">
                        {job.department}
                      </span>
                    ) : null}
                    <span className="mt-1 block text-base text-ink">{job.title}</span>
                    <span className="mt-1 block text-sm text-ink/50">
                      {job.location} · {job.employmentType}
                      {job.salaryRange ? ` · ${job.salaryRange}` : ""}
                    </span>
                    <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ink/55">
                      {excerpt(job.description)}
                    </span>
                  </span>
                  <span className="mt-2 shrink-0 text-sm text-brand-orange sm:mt-1">
                    View JD
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
