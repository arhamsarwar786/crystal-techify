import { PageShell } from "@/components/layout/PageShell";
import { Engagement } from "@/components/sections/Engagement";
import { ExpertCta } from "@/components/sections/ExpertCta";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { Clients } from "@/components/sections/Clients";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Partnerships } from "@/components/sections/Partnerships";
import { Services } from "@/components/sections/Services";
import { Snapshot } from "@/components/sections/Snapshot";
import { HomeScrollFX } from "@/components/ui/HomeScrollFX";

export default function HomePage() {
  return (
    <PageShell expertCta={false}>
      <HomeScrollFX />
      <Hero />
      <Clients />
      <Snapshot />
      <Services featured detailHref="/services" />
      <FeaturedCases detailHref="/case-studies" />
      <Industries detailHref="/industries" />
      <Engagement home detailHref="/process" />
      <ExpertCta index="07" />
      <Partnerships />
    </PageShell>
  );
}
