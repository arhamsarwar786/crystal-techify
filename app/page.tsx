import { PageShell } from "@/components/layout/PageShell";
import { Engagement } from "@/components/sections/Engagement";
import { ExpertCta } from "@/components/sections/ExpertCta";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { Hero } from "@/components/sections/Hero";
import { Partnerships } from "@/components/sections/Partnerships";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <PageShell splash expertCta={false}>
      <Hero />
      <Services featured detailHref="/services" />
      <FeaturedCases detailHref="/case-studies" />
      <Engagement home detailHref="/process" />
      <ExpertCta />
      <Partnerships />
    </PageShell>
  );
}
