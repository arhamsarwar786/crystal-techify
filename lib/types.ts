import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children: NavLink[];
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

/** Extra sections rendered on `/case-studies/[slug]`. */
export interface CasePageContent {
  brief: string;
  context: string;
  challenges: ServiceDetailBlock[];
  approach: ServiceDetailBlock[];
  shipped: string[];
  stack: string[];
}

export interface ProcessStep {
  index: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export type PortfolioCategory =
  | "Marketing"
  | "Mobility"
  | "Legal"
  | "Real Estate"
  | "Analytics"
  | "Architecture";

export interface PortfolioItem {
  slug: string;
  name: string;
  client: string;
  category: PortfolioCategory;
  summary: string;
  outcome: string;
  tags: string[];
  timeline: string;
  teamSize: string;
  /** Cover / gallery image in /public. Omit until the asset is supplied. */
  image?: string;
  /** Case-study PDF in /public. Omit until the asset is supplied. */
  pdf?: string;
}

/** Homepage clients marquee — logos pulled from each client's public site. */
export interface ClientLogo {
  name: string;
  website: string;
  logo: string;
  /** Wordmarks designed for dark headers; render black on the light canvas. */
  invertOnLight?: boolean;
}

export interface EngagementModel {
  icon: LucideIcon;
  title: string;
  description: string;
  bestFor: string;
  slug?: string;
  points?: string[];
  qualifierLabel?: string;
  qualifierOptions?: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export interface Industry {
  slug: string;
  icon: LucideIcon;
  name: string;
  description: string;
  image: string;
}

export interface IndustryPageContent {
  overview: string;
  challenges: ServiceDetailBlock[];
  approach: ServiceDetailBlock[];
  outcomes: string[];
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
