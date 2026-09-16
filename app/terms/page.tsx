import type { Metadata } from "next";
import { LegalDoc } from "@/components/pages/LegalDoc";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you use the ${COMPANY.name} website and get in touch with us.`,
};

export default function TermsPage() {
  return <LegalDoc kind="terms" />;
}
