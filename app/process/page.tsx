import { PageShell } from "@/components/layout/PageShell";
import { Engagement } from "@/components/sections/Engagement";
import { Process } from "@/components/sections/Process";

export default function ProcessPage() {
  return (
    <PageShell>
      <Process pageStart />
      <Engagement />
    </PageShell>
  );
}
