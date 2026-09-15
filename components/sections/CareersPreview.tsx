import { SectionHeading } from "@/components/ui/SectionHeading";

export function CareersPreview() {
  return (
    <section
      id="careers-preview"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title="Careers"
          description="Open roles in AI, product engineering, and delivery. Log in to apply with your CV."
          detailHref="/careers"
          detailLabel="View open roles"
        />
      </div>
    </section>
  );
}
