import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ApplyForm } from "@/components/careers/ApplyForm";
import { BandDecor } from "@/components/ui/BandDecor";
import { splitLines } from "@/lib/jobs";
import { parseQuestions } from "@/lib/job-questions";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

const HERO = "/careers/hero.jpg";

interface PageProps {
  params: { slug: string };
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-10">
      <h2 className="font-sans text-xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/80">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function JobPage({ params }: PageProps) {
  let job;
  try {
    job = await prisma.job.findUnique({ where: { slug: params.slug } });
  } catch (err) {
    console.error(err);
    return (
      <PageShell expertBand="muted">
        <section className="section-shell pb-20 pt-32">
          <p className="text-sm text-ink/80">
            This role could not load because the database is unreachable.
            Confirm DATABASE_URL and try again.
          </p>
        </section>
      </PageShell>
    );
  }
  if (!job || !job.active) notFound();
  const session = getSession();
  const questions = parseQuestions(job.questions);
  const alreadyApplied = session
    ? Boolean(
        await prisma.application.findFirst({
          where: { userId: session.id, jobId: job.id },
          select: { id: true },
        }),
      )
    : false;

  const paragraphs = job.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const loginHref = `/login?next=${encodeURIComponent(`/careers/${job.slug}`)}`;

  return (
    <PageShell>
      <section className="relative isolate min-h-[22rem] overflow-hidden bg-black sm:min-h-[26rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="section-shell relative flex min-h-[22rem] flex-col justify-end pb-12 pt-28 sm:min-h-[26rem] sm:pb-16 sm:pt-36">
          {job.department ? (
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">
              {job.department}
            </p>
          ) : null}
          <h1 className="mt-2 max-w-3xl font-sans text-[1.85rem] font-semibold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.1]">
            {job.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/80">
            <span className="rounded-full border border-white/20 px-3 py-1">
              {job.location}
            </span>
            <span className="rounded-full border border-white/20 px-3 py-1">
              {job.employmentType}
            </span>
            {job.salaryRange ? (
              <span className="rounded-full border border-white/20 px-3 py-1">
                {job.salaryRange}
              </span>
            ) : null}
          </div>
          {!session || !alreadyApplied ? (
            <Link
              href={session ? "#apply" : loginHref}
              className="mt-8 inline-flex w-fit items-center rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
            >
              Apply now
            </Link>
          ) : null}
        </div>
      </section>

      <section className="band-muted relative overflow-hidden pb-20 pt-14 sm:pt-16">
        <BandDecor />
        <div className="section-shell relative mx-auto max-w-3xl">
          <div className="space-y-4 text-sm leading-relaxed text-ink/80 sm:text-base">
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

          <div id="apply" className="card-on-muted card-static mt-12 scroll-mt-28">
            <h2 className="font-sans text-xl font-semibold tracking-tight text-ink">
              Apply
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Logged-in candidates can submit a CV for this role
              {questions.length
                ? `, including ${questions.length} required question${
                    questions.length === 1 ? "" : "s"
                  }`
                : ""}
              . One application per account.
            </p>
            {session && alreadyApplied ? (
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                You have already applied to this role. We will be in touch if
                there is a fit.
              </p>
            ) : session ? (
              <ApplyForm jobId={job.id} questions={questions} />
            ) : (
              <Link
                href={loginHref}
                className="mt-5 inline-flex items-center rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
              >
                Apply now
              </Link>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
