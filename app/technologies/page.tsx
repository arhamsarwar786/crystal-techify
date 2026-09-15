import { PageShell } from "@/components/layout/PageShell";
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
    <PageShell>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Technologies"
            title={
              <>
                The stack we ship{" "}
                <span className="gradient-text">in production</span>
              </>
            }
            description="The same work as our services, grouped by the technology you already run — or want to."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GROUPS.map((group) => (
              <Link
                key={group.title}
                href={group.href}
                className="glass gradient-border rounded-2xl p-5 transition-colors hover:bg-ink/[0.03] sm:p-6"
              >
                <h2 className="text-lg font-semibold text-ink">{group.title}</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.names.map((name) => {
                    const tech = TECH_STACK.find((t) => t.name === name);
                    return (
                      <li
                        key={name}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-ink/5 px-2.5 py-1 text-xs text-ink/70"
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

          <p className="mt-10 text-center text-sm text-ink/60">
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
