import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { Presence } from "@/components/sections/Presence";

export default function AboutPage() {
  return (
    <PageShell>
      <div className="pt-8" />
      <About />
      <Presence />
      <Advantages />
    </PageShell>
  );
}
