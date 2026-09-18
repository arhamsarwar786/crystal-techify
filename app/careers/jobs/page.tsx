import { PageShell } from "@/components/layout/PageShell";
import { BandDecor } from "@/components/ui/BandDecor";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { CareersJobsList } from "@/components/careers/CareersJobsList";

export const dynamic = "force-dynamic";

export default async function CareersJobsPage() {
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
  const loggedIn = Boolean(getSession());

  return (
    <PageShell expertBand="muted">
      <section className="band-canvas relative overflow-hidden pb-20 pt-28 sm:pt-36">
        <BandDecor />
        <div className="section-shell relative">
          <CareersJobsList jobs={jobs} dbDown={dbDown} loggedIn={loggedIn} />
        </div>
      </section>
    </PageShell>
  );
}
