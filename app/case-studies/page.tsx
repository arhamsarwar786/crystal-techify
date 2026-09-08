import { PageShell } from "@/components/layout/PageShell";
import { Portfolio } from "@/components/sections/Portfolio";

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <div className="pt-8" />
      <Portfolio />
    </PageShell>
  );
}
