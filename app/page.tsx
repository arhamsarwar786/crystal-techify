import { PageShell } from "@/components/layout/PageShell";
import { Engagement } from "@/components/sections/Engagement";
import { ExpertCta } from "@/components/sections/ExpertCta";
import { Clients } from "@/components/sections/Clients";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Services } from "@/components/sections/Services";
import { Snapshot } from "@/components/sections/Snapshot";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <PageShell expertCta={false}>
      <Hero />
      <Clients />
      <Snapshot />
      <Services featured detailHref="/services" />
      <Industries detailHref="/industries" />
      <Engagement home detailHref="/process" />
      <Testimonials band="canvas" />
      <ExpertCta band="muted" />
    </PageShell>
  );
}
