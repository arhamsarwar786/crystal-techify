import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";

export default function ContactPage() {
  return (
    <PageShell expertCta={false}>
      <Contact pageStart />
    </PageShell>
  );
}
