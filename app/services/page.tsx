import { PageShell } from "@/components/layout/PageShell";
import { Services } from "@/components/sections/Services";

export default function ServicesIndexPage() {
  return (
    <PageShell>
      <div className="pt-8" />
      <Services />
    </PageShell>
  );
}
