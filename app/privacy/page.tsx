import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${COMPANY.name} collects, uses, and protects the information you share with us.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 2026"
      intro={`This policy explains what ${COMPANY.name} does with the information you give us — mostly when you fill in the contact form or email us. We keep it short because our practices are simple.`}
    >
      <LegalSection heading="What we collect">
        <p>
          When you contact us we receive your name, email address, and anything
          else you choose to write, such as your company name and a description
          of your project. Our website also records standard, aggregated traffic
          data (pages viewed, approximate region, device type) so we can keep the
          site fast and useful.
        </p>
      </LegalSection>

      <LegalSection heading="How we use it">
        <p>
          We use your details to reply to your enquiry, scope potential work, and
          follow up about that specific conversation. We do not sell your
          information, and we do not add you to a marketing list without asking.
        </p>
      </LegalSection>

      <LegalSection heading="Who can see it">
        <p>
          Access is limited to the {COMPANY.name} team members involved in
          responding to you. We use reputable service providers for email and
          hosting; they process data on our behalf under their own security
          commitments and never for their own purposes.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We retain enquiry correspondence for as long as needed to serve you and
          to meet our legal and accounting obligations, then delete it. You can
          ask us to remove your information at any time.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          Email us at{" "}
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-brand-orange hover:underline"
          >
            {COMPANY.email}
          </a>{" "}
          to see, correct, or delete the information we hold about you, or to opt
          out of any further contact. We will respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          {COMPANY.name} maintains an ISO/IEC 27001-aligned information security
          program covering access control, encryption in transit, and staff
          training. No system is perfect, but we take the safeguarding of client
          information seriously.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
