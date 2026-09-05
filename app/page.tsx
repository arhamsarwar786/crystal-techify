import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Engagement } from "@/components/sections/Engagement";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { SplashScreen } from "@/components/ui/SplashScreen";

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <Header />
      <main>
        <Hero />
        <Services />
        <Industries />
        <Process />
        <Portfolio />
        <Engagement />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
