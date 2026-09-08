import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { CareersPreview } from "@/components/sections/CareersPreview";
import { Contact } from "@/components/sections/Contact";
import { Engagement } from "@/components/sections/Engagement";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Portfolio } from "@/components/sections/Portfolio";
import { Presence } from "@/components/sections/Presence";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <PageShell splash>
      <Hero />
      <About detailHref="/about" accent />
      <Presence detailHref="/about" />
      <Services detailHref="/services" />
      <Industries detailHref="/industries" />
      <Process detailHref="/process" />
      <Advantages detailHref="/about" />
      <Portfolio detailHref="/case-studies" />
      <Engagement detailHref="/process" />
      <Testimonials accent />
      <CareersPreview />
      <Contact detailHref="/contact" />
    </PageShell>
  );
}
