import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { CareersAccount } from "@/components/careers/CareersAccount";
import { BandDecor } from "@/components/ui/BandDecor";
import { excerpt } from "@/lib/jobs";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  let jobs: Awaited<ReturnType<typeof prisma.job.findMany>> = [];
  let dbDown = false;
  try {
    jobs = await prisma.job.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error(err);
    dbDown = true;
  }

  return (
    <PageShell>
      <section className="band-canvas relative overflow-hidden pb-20 pt-28 sm:pt-36">
        <BandDecor />
        <div className="section-shell relative">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-orange">
            Careers
          </p>
          <h1 className="mt-3 max-w-2xl font-sans text-[1.85rem] font-semibold tracking-tight text-ink sm:text-[2.5rem]">
            Build with Crystal Techify
          </h1>
          <span
            aria-hidden
            className="mt-4 block h-px w-9 bg-brand-orange"
          />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65 sm:text-[15px]">
            Open roles in AI, product engineering, and delivery. Log in to
            apply with your CV.
          </p>
          <CareersAccount />
          <ul className="mt-10 space-y-3">
            {dbDown && (
              <li className="rounded-2xl border border-brand-red/30 bg-brand-red/10 px-4 py-10 text-center text-sm text-ink">
                Careers could not load because the database is unreachable.
                Confirm DATABASE_URL and try again.
              </li>
            )}
            {!dbDown && jobs.length === 0 && (
              <li className="rounded-2xl border border-dashed border-ink/20 px-4 py-10 text-center text-sm text-ink/70">
                No open roles right now. Check back soon.
              </li>
            )}
            {jobs.map((job) => (
              <li key={job.id}>
                <Link
                  href={`/careers/${job.slug}`}
                  className="card-on-canvas fx-spot flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                >
                  <span className="min-w-0">
                    {job.department ? (
                      <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                        {job.department}
                      </span>
                    ) : null}
                    <span className="mt-1 block font-sans text-lg font-semibold tracking-tight text-ink">
                      {job.title}
                    </span>
                    <span className="mt-1 block text-sm text-ink/70">
                      {job.location} · {job.employmentType}
                      {job.salaryRange ? ` · ${job.salaryRange}` : ""}
                    </span>
                    <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ink/75">
                      {excerpt(job.description)}
                    </span>
                  </span>
                  <span className="mt-2 inline-flex shrink-0 items-center self-start rounded-full border border-brand-orange/35 bg-brand-orange/10 px-3 py-1.5 text-sm font-medium text-brand-orange sm:mt-1">
                    View role
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
