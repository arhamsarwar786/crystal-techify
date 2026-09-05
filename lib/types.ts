import type { LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
  title: string;
  description: string;
  capabilities: string[];
  accent: string;
}

export interface ProcessStep {
  index: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export type PortfolioCategory =
  | "AI & Data"
  | "Web & Mobile"
  | "Platforms"
  | "Sustainability";

export interface PortfolioItem {
  name: string;
  client: string;
  category: PortfolioCategory;
  summary: string;
  outcome: string;
  tags: string[];
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
}
