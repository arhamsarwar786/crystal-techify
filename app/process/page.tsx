import { PageShell } from "@/components/layout/PageShell";
import { Engagement } from "@/components/sections/Engagement";
import { Process } from "@/components/sections/Process";

export default function ProcessPage() {
  return (
    <PageShell>
      <div className="pt-8" />
      <Process />
      <Engagement />
    </PageShell>
  );
}
