import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface TrustMetric {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  overview: string;
  capabilities: string[];
  deliverables: string[];
  accent: string;
}

export interface ServiceDetailBlock {
  title: string;
  body: string;
}

/** Extra sections rendered on `/services/[slug]`. */
export interface ServicePageContent {
  problem: string;
  challenges: ServiceDetailBlock[];
  method: ServiceDetailBlock[];
  useCases: ServiceDetailBlock[];
  stack: string[];
}

export interface ProcessStep {
  index: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export type PortfolioCategory =
  | "Mobility"
  | "Legal"
  | "Real Estate"
  | "Analytics"
  | "Architecture";

export interface PortfolioItem {
  name: string;
  client: string;
  category: PortfolioCategory;
  summary: string;
  outcome: string;
  tags: string[];
  timeline: string;
  teamSize: string;
}

export interface EngagementModel {
  icon: LucideIcon;
  title: string;
  description: string;
  bestFor: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export interface Industry {
  icon: LucideIcon;
  name: string;
  description: string;
}

export interface TechStackItem {
  name: string;
  icon: IconType;
  /** Real brand hex, shown on hover. Omitted for marks that are themselves
   * monochrome (e.g. Next.js, Rust) — those already track the ink token. */
  color?: string;
}

export interface MissionPoint {
  index: string;
  title: string;
  description: string;
}

export interface Advantage {
  index: string;
  title: string;
  description: string;
}

export interface JourneyMilestone {
  title: string;
  description: string;
  icon: LucideIcon;
}
