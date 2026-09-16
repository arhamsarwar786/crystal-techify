import type { Metadata } from "next";
import { LegalDoc } from "@/components/pages/LegalDoc";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${COMPANY.name} collects, uses, and protects the information you share with us.`,
};

export default function PrivacyPage() {
  return <LegalDoc kind="privacy" />;
}
