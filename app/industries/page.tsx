import { PageShell } from "@/components/layout/PageShell";
import { Industries } from "@/components/sections/Industries";

export default function IndustriesPage() {
  return (
    <PageShell expertBand="muted">
      <Industries pageStart />
    </PageShell>
  );
}
