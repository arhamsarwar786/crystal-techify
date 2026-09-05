import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you use the ${COMPANY.name} website and get in touch with us.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="September 2026"
      intro={`These terms cover your use of this website. Paid engagements are governed by a separate master services agreement and statement of work signed by both parties.`}
    >
      <LegalSection heading="Using this site">
        <p>
          You are welcome to browse this site and contact us about your project.
          Please do not attempt to disrupt the site, scrape it at scale, or use
          it to send unlawful or abusive content.
        </p>
      </LegalSection>

      <LegalSection heading="Enquiries are not a contract">
        <p>
          Submitting the contact form or emailing us does not create a
          professional engagement or any obligation on either side. Work begins
          only once {COMPANY.name} and the client sign a written agreement that
          sets out scope, fees, timelines, and ownership of deliverables.
        </p>
      </LegalSection>

      <LegalSection heading="Content and intellectual property">
        <p>
          The text, design, logo, and graphics on this site belong to{" "}
          {COMPANY.name} unless stated otherwise. Case studies describe work
          delivered for named clients and are published with their permission.
          You may not reproduce the site&apos;s content for commercial use
          without our consent.
        </p>
      </LegalSection>

      <LegalSection heading="No warranty">
        <p>
          This website is provided &ldquo;as is&rdquo;. We work to keep the
          information accurate and current, but we do not warrant that it is
          complete or error-free, and metrics quoted (such as project counts or
          rankings) reflect a point in time.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          To the fullest extent permitted by law, {COMPANY.name} is not liable
          for any indirect or consequential loss arising from your use of this
          website.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of the State of Ohio, USA. Any
          dispute relating to this website will be handled by the courts located
          there.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Email{" "}
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-brand-orange hover:underline"
          >
            {COMPANY.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
