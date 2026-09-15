import { PageShell } from "@/components/layout/PageShell";
import { TestimonialsGrid } from "@/components/sections/TestimonialsGrid";

export default function TestimonialsPage() {
  return (
    <PageShell>
      <div className="pt-24 sm:pt-32" />
      <TestimonialsGrid />
    </PageShell>
  );
}
