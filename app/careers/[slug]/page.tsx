import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ApplyForm } from "@/components/careers/ApplyForm";
import { splitLines } from "@/lib/jobs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-10">
      <h2 className="text-xl">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function JobPage({ params }: PageProps) {
  const job = await prisma.job.findUnique({ where: { slug: params.slug } });
  if (!job || !job.active) notFound();
  const session = getSession();

  const paragraphs = job.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <PageShell>
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <div className="section-shell relative mx-auto max-w-3xl">
          <Link href="/careers" className="text-sm text-ink/55 hover:text-ink">
            ← All roles
          </Link>
          {job.department ? (
            <p className="mt-6 font-display text-[10px] uppercase tracking-[0.22em] text-brand-orange">
              {job.department}
            </p>
          ) : null}
          <h1 className="mt-3 text-3xl sm:text-4xl">{job.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/60">
            <span className="rounded-full border border-ink/10 px-3 py-1">
              {job.location}
            </span>
            <span className="rounded-full border border-ink/10 px-3 py-1">
              {job.employmentType}
            </span>
            {job.salaryRange ? (
              <span className="rounded-full border border-ink/10 px-3 py-1">
                {job.salaryRange}
              </span>
            ) : null}
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink/70">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <Section
            title="What you will do"
            items={splitLines(job.responsibilities)}
          />
          <Section title="What we look for" items={splitLines(job.requirements)} />
          <Section title="Nice to have" items={splitLines(job.niceToHave)} />
          <Section title="Benefits" items={splitLines(job.benefits)} />

          <div className="mt-12 rounded-2xl border border-ink/10 bg-ink/[0.03] p-5 sm:p-6">
            <h2 className="text-xl">Apply</h2>
            <p className="mt-2 text-sm text-ink/55">
              Logged-in candidates can submit a CV for this role. One
              application per account.
            </p>
            {session ? (
              <ApplyForm jobId={job.id} />
            ) : (
              <p className="mt-3 text-sm text-ink/60">
                <Link
                  href={`/login?next=${encodeURIComponent(`/careers/${job.slug}`)}`}
                  className="text-brand-orange"
                >
                  Log in
                </Link>{" "}
                or{" "}
                <Link
                  href={`/signup?next=${encodeURIComponent(`/careers/${job.slug}`)}`}
                  className="text-brand-orange"
                >
                  sign up
                </Link>{" "}
                to submit your CV and details.
              </p>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
