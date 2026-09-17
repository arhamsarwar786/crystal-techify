import { SectionHeading } from "@/components/ui/SectionHeading";

export function CareersPreview() {
  return (
    <section
      id="careers-preview"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-28"
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
