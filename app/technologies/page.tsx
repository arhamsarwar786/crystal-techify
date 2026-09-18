import { PageShell } from "@/components/layout/PageShell";
import { BandDecor } from "@/components/ui/BandDecor";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES, TECH_STACK } from "@/lib/data";
import Link from "next/link";

const GROUPS = [
  {
    title: "AI / Machine Learning",
    href: "/services/artificial-intelligence",
    names: ["Python", "PyTorch", "TensorFlow", "LangChain", "Hugging Face"],
  },
  {
    title: "Web & SaaS",
    href: "/services/saas",
    names: ["TypeScript", "Next.js", "React", "Node.js", "Angular", "Postgres"],
  },
  {
    title: "Mobile",
    href: "/services/mobile-development",
    names: ["Flutter", "iOS", "Android"],
  },
  {
    title: "Cloud",
    href: "/services/saas",
    names: ["AWS", "GCP", "Kubernetes", "Terraform"],
  },
  {
    title: "Web3",
    href: "/services/web3-development",
    names: ["Ethereum", "Solidity"],
  },
];

export default function TechnologiesPage() {
  return (
    <PageShell expertBand="muted">
      <section className="band-canvas relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36">
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading
            kicker="Stack"
            title="Technologies"
            description="The stack we ship in production — grouped by the work you already run, or want to."
          />

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {GROUPS.map((group) => (
              <Link
                key={group.title}
                href={group.href}
                className="card-on-canvas fx-spot"
              >
                <h2 className="font-sans text-base font-semibold text-ink">
                  {group.title}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.names.map((name) => {
                    const tech = TECH_STACK.find((t) => t.name === name);
                    return (
                      <li
                        key={name}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs text-ink/70 dark:bg-white/[0.08]"
                      >
                        {tech && <tech.icon className="h-3.5 w-3.5" />}
                        {name}
                      </li>
                    );
                  })}
                </ul>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-sm text-ink/60">
            Looking for a service instead?{" "}
            <Link href="/services" className="text-brand-orange hover:text-ink">
              Browse all {SERVICES.length} services
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
